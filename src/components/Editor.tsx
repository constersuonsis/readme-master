import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Table, CheckSquare } from 'lucide-react';
import { Stats } from '../types';
import { detectBlocks, BlockRange } from '../utils/markdownBlocks';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  onStatsChange: (stats: Stats) => void;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  onInsert: (prefix: string, suffix?: string, placeholder?: string) => void;
  onSave: () => void;
  onEditBlock?: (block: BlockRange) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, onStatsChange, editorRef, onInsert, onSave, onEditBlock }) => {
  const [lineCount, setLineCount] = useState(1);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(val);
    updateStats(val);
  };

  const updateStats = useCallback((text: string) => {
    const lines = text.split('\n').length;
    setLineCount(lines);
    onStatsChange({
      chars: text.length,
      words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
      lines: lines
    });
  }, [onStatsChange]);

  const handleScroll = () => {
    if (editorRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  const blocks = useMemo(() => detectBlocks(value), [value]);

  const gutterIcons = useMemo(() => {
    const seen = new Set<string>();
    const icons: { line: number; block: BlockRange }[] = [];
    blocks.forEach((block, _line) => {
      const key = `${block.type}-${block.startLine}`;
      if (!seen.has(key)) {
        seen.add(key);
        icons.push({ line: block.startLine, block });
      }
    });
    return icons;
  }, [blocks]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ctrl = e.ctrlKey || e.metaKey;

    if (ctrl && !e.shiftKey && e.key === 'b') {
      e.preventDefault();
      onInsert('**', '**', 'bold text');
    } else if (ctrl && !e.shiftKey && e.key === 'i') {
      e.preventDefault();
      onInsert('*', '*', 'italic text');
    } else if (ctrl && !e.shiftKey && e.key === 'k') {
      e.preventDefault();
      onInsert('[', '](url)', 'link text');
    } else if (ctrl && e.shiftKey && (e.key === 'c' || e.key === 'C' || e.key === 'с' || e.key === 'С')) {
      e.preventDefault();
      onInsert('```\n', '\n```', 'code');
    } else if (ctrl && !e.shiftKey && e.key === 's') {
      e.preventDefault();
      onSave();
    }
  }, [onInsert, onSave]);

  const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = editorRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  useEffect(() => {
    updateStats(value);
  }, []);

  return (
    <div className="relative flex h-full font-mono text-sm">
      <div 
        ref={lineNumbersRef}
        className="hidden sm:block w-16 pt-4 pb-4 bg-gray-100 dark:bg-github-darker border-r border-gray-200 dark:border-github-border select-none overflow-hidden theme-transition"
      >
        {Array.from({ length: lineCount }).map((_, i) => {
          const gutterItem = gutterIcons.find(g => g.line === i);
          return (
            <div key={i} className="leading-6 flex items-center h-6 group">
              <div className="w-5 flex items-center justify-center flex-shrink-0">
                {gutterItem && onEditBlock && (
                  <button
                    onClick={() => onEditBlock(gutterItem.block)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-500 dark:text-blue-400"
                    title={gutterItem.block.type === 'table' ? 'Edit table' : 'Edit tasks'}
                  >
                    {gutterItem.block.type === 'table' ? <Table size={12} /> : <CheckSquare size={12} />}
                  </button>
                )}
              </div>
              <div className="flex-1 text-right pr-2 text-gray-400 dark:text-gray-600 text-xs">
                {i + 1}
              </div>
            </div>
          );
        })}
      </div>

      <textarea
        ref={editorRef}
        value={value}
        onChange={handleChange}
        onScroll={handleScroll}
        onKeyDown={(e) => { handleKeyDown(e); handleTab(e); }}
        spellCheck={false}
        className="flex-1 w-full h-full p-4 bg-white dark:bg-github-dark text-gray-900 dark:text-github-text resize-none outline-none leading-6 border-0 focus:ring-0 theme-transition overflow-y-auto overscroll-y-contain"
        placeholder="Type here..."
      />
    </div>
  );
};

export default Editor;
