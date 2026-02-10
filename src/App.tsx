import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Download, Upload, Copy, Sun, Moon,
  Trash2, FilePlus, Monitor
} from 'lucide-react';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import TableGenerator from './components/TableGenerator';
import TaskManager from './components/TaskManager';
import Tooltip from './components/Tooltip';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_MARKDOWN, TEMPLATES, TRANSLATIONS } from './constants';
import { Language, Theme, Stats, Template } from './types';
import { BlockRange, parseTable, parseTasks, ParsedTable, ParsedTask } from './utils/markdownBlocks';

function App() {
  const [markdown, setMarkdown] = useLocalStorage<string>('readme-content', INITIAL_MARKDOWN);
  const [lang, setLang] = useLocalStorage<Language>('readme-lang', 'en');
  const [theme, setTheme] = useLocalStorage<Theme>('readme-theme', 'light');
  const [stats, setStats] = useState<Stats>({ chars: 0, words: 0, lines: 0 });
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showTableGen, setShowTableGen] = useState(false);
  const [showTaskMgr, setShowTaskMgr] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [editingBlock, setEditingBlock] = useState<BlockRange | null>(null);
  const [tableInitialData, setTableInitialData] = useState<ParsedTable | null>(null);
  const [taskInitialData, setTaskInitialData] = useState<ParsedTask[] | null>(null);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode(prev => prev === 'split' ? 'edit' : prev);
      } else {
        setViewMode('split');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleInsert = (prefix: string, suffix = '', placeholder = '') => {
    if (!editorRef.current) return;
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    const selectedText = text.substring(start, end) || placeholder;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newValue = `${before}${prefix}${selectedText}${suffix}${after}`;
    setMarkdown(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const handleInsertBlock = (block: string) => {
    if (!editorRef.current) return;
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(start);
    
    const needsNewline = before.length > 0 && !before.endsWith('\n') ? '\n\n' : '';
    const newValue = `${before}${needsNewline}${block}\n${after}`;
    setMarkdown(newValue);
    
    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  const handleReplaceBlock = useCallback((block: BlockRange, newContent: string) => {
    const lines = markdown.split('\n');
    const before = lines.slice(0, block.startLine);
    const after = lines.slice(block.endLine + 1);
    const newValue = [...before, newContent, ...after].join('\n');
    setMarkdown(newValue);
  }, [markdown, setMarkdown]);

  const handleEditBlock = useCallback((block: BlockRange) => {
    const lines = markdown.split('\n');
    const blockLines = lines.slice(block.startLine, block.endLine + 1);
    
    setEditingBlock(block);

    if (block.type === 'table') {
      const parsed = parseTable(blockLines);
      setTableInitialData(parsed);
      setTaskInitialData(null);
      setShowTableGen(true);
    } else if (block.type === 'tasks') {
      const parsed = parseTasks(blockLines);
      setTaskInitialData(parsed);
      setTableInitialData(null);
      setShowTaskMgr(true);
    }
  }, [markdown]);

  const handleTableInsert = useCallback((content: string) => {
    if (editingBlock && editingBlock.type === 'table') {
      handleReplaceBlock(editingBlock, content);
    } else {
      handleInsertBlock(content);
    }
    setEditingBlock(null);
    setTableInitialData(null);
  }, [editingBlock, handleReplaceBlock, handleInsertBlock]);

  const handleTaskInsert = useCallback((content: string) => {
    if (editingBlock && editingBlock.type === 'tasks') {
      handleReplaceBlock(editingBlock, content);
    } else {
      handleInsertBlock(content);
    }
    setEditingBlock(null);
    setTaskInitialData(null);
  }, [editingBlock, handleReplaceBlock, handleInsertBlock]);

  const handleTableClose = () => {
    setShowTableGen(false);
    setEditingBlock(null);
    setTableInitialData(null);
  };

  const handleTaskClose = () => {
    setShowTaskMgr(false);
    setEditingBlock(null);
    setTaskInitialData(null);
  };

  const handleApplyTemplate = (template: Template) => {
    setMarkdown(template.content[lang]);
    setShowTemplates(false);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('toast.saved'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    showToast(t('toast.copied'));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setMarkdown(text);
        showToast(t('toast.loaded'));
      };
      reader.readAsText(file);
    }
  };

  const handleNew = () => {
    if (window.confirm(t('alert.unsaved'))) {
      setMarkdown('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-github-darker theme-transition">
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-github-dark border-b border-gray-200 dark:border-github-border theme-transition">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black dark:from-white dark:to-gray-200 rounded-md flex items-center justify-center text-white dark:text-black font-bold text-lg theme-transition">
            M
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block theme-transition">
            README Master
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
           <div className="flex md:hidden bg-gray-100 dark:bg-github-border rounded-lg p-1 mr-2 theme-transition">
            <button 
              onClick={() => setViewMode('edit')}
              className={`p-1.5 rounded-md theme-transition ${viewMode === 'edit' ? 'bg-white dark:bg-github-hover shadow-sm' : 'text-gray-500'}`}
            >
              <FilePlus size={16} />
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={`p-1.5 rounded-md theme-transition ${viewMode === 'preview' ? 'bg-white dark:bg-github-hover shadow-sm' : 'text-gray-500'}`}
            >
              <Monitor size={16} />
            </button>
          </div>

          <Tooltip text={t('action.new')}>
            <button onClick={handleNew} className="btn-icon">
              <Trash2 size={18} />
            </button>
          </Tooltip>
          
          <Tooltip text={t('action.open')}>
            <label className="btn-icon cursor-pointer">
              <Upload size={18} />
              <input type="file" className="hidden" accept=".md,.txt" ref={fileInputRef} onChange={handleFileUpload} />
            </label>
          </Tooltip>

          <Tooltip text={t('action.save')}>
            <button onClick={handleDownload} className="btn-icon">
              <Download size={18} />
            </button>
          </Tooltip>
          
          <Tooltip text={t('action.copy')}>
            <button onClick={handleCopy} className="btn-icon">
              <Copy size={18} />
            </button>
          </Tooltip>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1.5" />

          <Tooltip text={t('settings.theme')}>
            <button 
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
              className="btn-icon"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </Tooltip>
          
          <Tooltip text={t('settings.language')}>
            <button 
              onClick={() => setLang(prev => prev === 'en' ? 'ru' : 'en')} 
              className="btn-icon font-bold text-sm w-9"
            >
              {lang.toUpperCase()}
            </button>
          </Tooltip>
        </div>
      </header>

      <Toolbar 
        onInsert={handleInsert} 
        onOpenTemplates={() => setShowTemplates(true)} 
        onOpenTableGenerator={() => { setEditingBlock(null); setTableInitialData(null); setShowTableGen(true); }}
        onOpenTaskManager={() => { setEditingBlock(null); setTaskInitialData(null); setShowTaskMgr(true); }}
        lang={lang} 
      />

      <main className="flex-1 flex overflow-hidden relative min-h-0">
        <div className={`
          flex-1 flex flex-col min-w-0 overflow-hidden isolate
          ${viewMode === 'preview' ? 'hidden' : 'block'} 
          ${viewMode === 'split' ? 'w-1/2 border-r border-gray-200 dark:border-github-border' : 'w-full'}
        `}>
          <Editor 
            value={markdown} 
            onChange={setMarkdown} 
            onStatsChange={setStats}
            editorRef={editorRef}
            onInsert={handleInsert}
            onSave={handleDownload}
            onEditBlock={handleEditBlock}
          />
        </div>

        <div className={`
          flex-1 flex flex-col min-w-0 overflow-hidden isolate bg-white dark:bg-github-dark theme-transition
          ${viewMode === 'edit' ? 'hidden' : 'block'}
          ${viewMode === 'split' ? 'w-1/2' : 'w-full'}
        `}>
          <Preview markdown={markdown} />
        </div>
      </main>

      <footer className="bg-white dark:bg-github-dark border-t border-gray-200 dark:border-github-border px-4 py-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center select-none theme-transition">
        <div className="flex gap-4">
          <span>{stats.lines} {t('stats.lines')}</span>
          <span>{stats.words} {t('stats.words')}</span>
          <span>{stats.chars} {t('stats.chars')}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Markdown · UTF-8</span>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <span>
            Made by{' '}
            <a href="https://vk.com/only_yours2021" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">VK</a>
            {' · '}
            <a href="https://github.com/constersuonsis" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">GitHub</a>
          </span>
        </div>
      </footer>

      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-github-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-gray-200 dark:border-github-border theme-transition">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-github-border">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('modal.templates.title')}</h2>
              <button 
                onClick={() => setShowTemplates(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-github-hover theme-transition"
              >
                &times;
              </button>
            </div>
            <div className="p-4 overflow-y-auto grid gap-3 sm:grid-cols-2">
              {TEMPLATES.map(tmpl => (
                <div 
                  key={tmpl.id}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-4 border border-gray-200 dark:border-github-border rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group theme-transition"
                >
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1.5">
                    {tmpl.name[lang]}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tmpl.description[lang]}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-github-border text-right">
              <button 
                onClick={() => setShowTemplates(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 theme-transition"
              >
                {t('modal.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      <TableGenerator
        isOpen={showTableGen}
        onClose={handleTableClose}
        onInsert={handleTableInsert}
        lang={lang}
        initialData={tableInitialData}
      />

      <TaskManager
        isOpen={showTaskMgr}
        onClose={handleTaskClose}
        onInsert={handleTaskInsert}
        lang={lang}
        initialData={taskInitialData}
      />

      {toast && (
        <div className="fixed bottom-10 right-4 z-50 bg-gray-900 dark:bg-blue-600 text-white px-4 py-2.5 rounded-lg shadow-lg animate-fade-in-up font-medium text-sm">
          {toast}
        </div>
      )}

      <style>{`
        .btn-icon {
          @apply p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-github-hover text-gray-600 dark:text-gray-300 theme-transition;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>
    </div>
  );
}

export default App;

