import React from 'react';
import { 
  Bold, Italic, Link, Code, Quote, List, ListOrdered, CheckSquare, 
  Image as ImageIcon, Table, Heading1, FileText, Strikethrough, Minus, ClipboardList
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import Tooltip from './Tooltip';

interface ToolbarProps {
  onInsert: (prefix: string, suffix?: string, placeholder?: string) => void;
  onOpenTemplates: () => void;
  onOpenTableGenerator: () => void;
  onOpenTaskManager: () => void;
  lang: Language;
}

const Toolbar: React.FC<ToolbarProps> = ({ onInsert, onOpenTemplates, onOpenTableGenerator, onOpenTaskManager, lang }) => {
  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  const tools = [
    { icon: <Heading1 size={18} />, action: () => onInsert('## ', ''), tip: t('toolbar.header') },
    { icon: <Bold size={18} />, action: () => onInsert('**', '**', 'bold text'), tip: t('toolbar.bold') },
    { icon: <Italic size={18} />, action: () => onInsert('*', '*', 'italic text'), tip: t('toolbar.italic') },
    { icon: <Strikethrough size={18} />, action: () => onInsert('~~', '~~', 'strikethrough'), tip: t('toolbar.strikethrough') },
    'sep',
    { icon: <Quote size={18} />, action: () => onInsert('> ', ''), tip: t('toolbar.quote') },
    { icon: <Code size={18} />, action: () => onInsert('```\n', '\n```', 'code'), tip: t('toolbar.code') },
    { icon: <Link size={18} />, action: () => onInsert('[', '](url)', 'link text'), tip: t('toolbar.link') },
    { icon: <ImageIcon size={18} />, action: () => onInsert('![', '](url)', 'alt text'), tip: t('toolbar.image') },
    'sep',
    { icon: <List size={18} />, action: () => onInsert('- ', ''), tip: t('toolbar.list') },
    { icon: <ListOrdered size={18} />, action: () => onInsert('1. ', ''), tip: t('toolbar.orderedList') },
    { icon: <Minus size={18} />, action: () => onInsert('\n---\n', ''), tip: t('toolbar.hr') },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-github-border bg-white dark:bg-github-dark sticky top-0 z-20 theme-transition">
      {tools.map((tool, index) =>
        tool === 'sep' ? (
          <div key={`sep-${index}`} className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        ) : (
          <Tooltip key={index} text={(tool as any).tip}>
            <button
              onClick={(tool as any).action}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-github-hover text-gray-700 dark:text-gray-300 theme-transition"
            >
              {(tool as any).icon}
            </button>
          </Tooltip>
        )
      )}

      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

      <Tooltip text={lang === 'ru' ? 'Генератор таблиц' : 'Table Generator'}>
        <button
          onClick={onOpenTableGenerator}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-github-hover hover:bg-gray-200 dark:hover:bg-gray-700 rounded theme-transition"
        >
          <Table size={16} />
          <span className="hidden md:inline">{lang === 'ru' ? 'Таблица' : 'Table'}</span>
        </button>
      </Tooltip>

      <Tooltip text={lang === 'ru' ? 'Менеджер задач' : 'Task Manager'}>
        <button
          onClick={onOpenTaskManager}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-github-hover hover:bg-gray-200 dark:hover:bg-gray-700 rounded theme-transition"
        >
          <ClipboardList size={16} />
          <span className="hidden md:inline">{lang === 'ru' ? 'Задачи' : 'Tasks'}</span>
        </button>
      </Tooltip>

      <Tooltip text={t('modal.templates.title')}>
        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-github-hover hover:bg-gray-200 dark:hover:bg-gray-700 rounded theme-transition"
        >
          <FileText size={16} />
          <span className="hidden md:inline">{lang === 'ru' ? 'Шаблоны' : 'Templates'}</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default Toolbar;
