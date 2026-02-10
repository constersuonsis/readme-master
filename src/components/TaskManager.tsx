import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowDownToLine, GripVertical, Trash2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ParsedTask } from '../utils/markdownBlocks';

interface TaskManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (markdown: string) => void;
  lang: Language;
  initialData?: ParsedTask[] | null;
}

interface TaskItem {
  id: string;
  text: string;
  done: boolean;
  indent: number;
}

const TaskManager: React.FC<TaskManagerProps> = ({ isOpen, onClose, onInsert, lang, initialData }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: '1', text: '', done: false, indent: 0 },
  ]);
  const [title, setTitle] = useState('');

  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  // Load initial data when editing existing tasks
  useEffect(() => {
    if (isOpen && initialData && initialData.length > 0) {
      const items = initialData.map((t, i) => ({
        id: Date.now().toString() + i,
        text: t.text,
        done: t.done,
        indent: t.indent,
      }));
      setTasks(items);
      setTitle('');
    } else if (isOpen && !initialData) {
      resetTasks();
    }
  }, [isOpen, initialData]);

  const addTask = (afterIndex: number, indent: number = 0) => {
    const newTask: TaskItem = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      text: '',
      done: false,
      indent,
    };
    const newTasks = [...tasks];
    newTasks.splice(afterIndex + 1, 0, newTask);
    setTasks(newTasks);
    setTimeout(() => {
      const inputs = document.querySelectorAll('.task-input');
      const target = inputs[afterIndex + 1] as HTMLInputElement;
      if (target) target.focus();
    }, 50);
  };

  const removeTask = (index: number) => {
    if (tasks.length <= 1) {
      setTasks([{ id: '1', text: '', done: false, indent: 0 }]);
      return;
    }
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, updates: Partial<TaskItem>) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], ...updates };
    setTasks(newTasks);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask(index, tasks[index].indent);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        updateTask(index, { indent: Math.max(0, tasks[index].indent - 1) });
      } else {
        updateTask(index, { indent: Math.min(2, tasks[index].indent + 1) });
      }
    } else if (e.key === 'Backspace' && tasks[index].text === '' && tasks.length > 1) {
      e.preventDefault();
      removeTask(index);
      setTimeout(() => {
        const inputs = document.querySelectorAll('.task-input');
        const target = inputs[Math.max(0, index - 1)] as HTMLInputElement;
        if (target) target.focus();
      }, 50);
    }
  };

  const generateMarkdown = () => {
    const lines: string[] = [];
    if (title.trim()) {
      lines.push(`## ${title}`, '');
    }
    tasks.forEach(task => {
      if (!task.text.trim() && tasks.length > 1) return;
      const indent = '  '.repeat(task.indent);
      const checkbox = task.done ? '[x]' : '[ ]';
      lines.push(`${indent}- ${checkbox} ${task.text || '...'}`);
    });
    return lines.join('\n');
  };

  const handleInsert = () => {
    onInsert(generateMarkdown());
    onClose();
  };

  const resetTasks = () => {
    setTasks([{ id: '1', text: '', done: false, indent: 0 }]);
    setTitle('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-github-dark rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col border border-gray-200 dark:border-github-border theme-transition">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-github-border">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {initialData
              ? (lang === 'ru' ? 'Редактировать задачи' : 'Edit Tasks')
              : (lang === 'ru' ? 'Менеджер задач' : 'Task Manager')
            }
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-github-hover theme-transition">
            <X size={20} />
          </button>
        </div>

        {!initialData && (
          <div className="px-4 pt-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lang === 'ru' ? 'Заголовок секции (необязательно)' : 'Section title (optional)'}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-github-border bg-gray-50 dark:bg-github-darker text-gray-900 dark:text-github-text placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-sm theme-transition"
            />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="flex items-center gap-1.5 group"
              style={{ paddingLeft: `${task.indent * 24}px` }}
            >
              <GripVertical size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => updateTask(index, { done: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 flex-shrink-0 cursor-pointer"
              />
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask(index, { text: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder={lang === 'ru' ? 'Описание задачи...' : 'Task description...'}
                className={`task-input flex-1 px-2 py-1.5 rounded border border-transparent hover:border-gray-200 dark:hover:border-github-border focus:border-blue-400 dark:focus:border-blue-600 bg-transparent text-sm outline-none theme-transition ${
                  task.done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'
                }`}
              />
              <button
                onClick={() => removeTask(index)}
                className="p-1 rounded text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          
          <button
            onClick={() => addTask(tasks.length - 1, 0)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-500 px-2 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-github-hover mt-2 theme-transition"
          >
            <Plus size={14} />
            {lang === 'ru' ? 'Добавить задачу' : 'Add task'}
          </button>
        </div>

        <div className="px-4 py-2 bg-gray-50 dark:bg-github-darker text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-github-border theme-transition">
          <span className="font-medium">Enter</span> — {lang === 'ru' ? 'новая задача' : 'new task'} · 
          <span className="font-medium ml-1">Tab</span> — {lang === 'ru' ? 'вложить' : 'indent'} · 
          <span className="font-medium ml-1">Shift+Tab</span> — {lang === 'ru' ? 'убрать вложение' : 'unindent'}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 dark:border-github-border">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-github-darker border border-gray-200 dark:border-github-border font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-pre overflow-x-auto max-h-32 theme-transition">
            {generateMarkdown()}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-github-border">
          <button onClick={resetTasks} className="text-xs text-gray-400 hover:text-red-500 mr-auto">
            {lang === 'ru' ? 'Сбросить' : 'Reset'}
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-github-hover hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition">
            {t('modal.close')}
          </button>
          <button onClick={handleInsert} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 flex items-center gap-2 shadow-sm transition-colors">
            <ArrowDownToLine size={15} />
            {initialData
              ? (lang === 'ru' ? 'Обновить' : 'Update')
              : (lang === 'ru' ? 'Вставить' : 'Insert')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
