import React, { useState, useEffect } from 'react';
import { Plus, Minus, X, ArrowDownToLine } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ParsedTable } from '../utils/markdownBlocks';

interface TableGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (markdown: string) => void;
  lang: Language;
  initialData?: ParsedTable | null;
}

type Align = 'left' | 'center' | 'right';

const TableGenerator: React.FC<TableGeneratorProps> = ({ isOpen, onClose, onInsert, lang, initialData }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [cells, setCells] = useState<string[][]>(() => createEmptyGrid(3, 3));
  const [aligns, setAligns] = useState<Align[]>(() => Array(3).fill('left'));

  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  function createEmptyGrid(r: number, c: number): string[][] {
    return Array.from({ length: r }, (_, ri) =>
      Array.from({ length: c }, (_, ci) => ri === 0 ? `Header ${ci + 1}` : '')
    );
  }

  useEffect(() => {
    if (isOpen && initialData) {
      const numCols = initialData.headers.length;
      const numRows = initialData.rows.length + 1; // +1 for header
      const newCells: string[][] = [
        [...initialData.headers],
        ...initialData.rows.map(row => [...row]),
      ];
      setCells(newCells);
      setAligns([...initialData.aligns]);
      setRows(numRows);
      setCols(numCols);
    } else if (isOpen && !initialData) {
      resetTable();
    }
  }, [isOpen, initialData]);

  const updateCell = (r: number, c: number, value: string) => {
    const newCells = cells.map(row => [...row]);
    newCells[r][c] = value;
    setCells(newCells);
  };

  const addRow = () => {
    const newRow = Array(cols).fill('');
    setCells([...cells, newRow]);
    setRows(rows + 1);
  };

  const removeRow = () => {
    if (rows <= 2) return;
    setCells(cells.slice(0, -1));
    setRows(rows - 1);
  };

  const addCol = () => {
    setCells(cells.map((row, ri) => [...row, ri === 0 ? `Header ${cols + 1}` : '']));
    setAligns([...aligns, 'left']);
    setCols(cols + 1);
  };

  const removeCol = () => {
    if (cols <= 1) return;
    setCells(cells.map(row => row.slice(0, -1)));
    setAligns(aligns.slice(0, -1));
    setCols(cols - 1);
  };

  const cycleAlign = (colIdx: number) => {
    const order: Align[] = ['left', 'center', 'right'];
    const cur = aligns[colIdx];
    const next = order[(order.indexOf(cur) + 1) % 3];
    const newAligns = [...aligns];
    newAligns[colIdx] = next;
    setAligns(newAligns);
  };

  const generateMarkdown = () => {
    const padCell = (text: string, width: number) => {
      const t = text || ' ';
      return t.padEnd(Math.max(width, t.length));
    };

    const colWidths = Array.from({ length: cols }, (_, ci) =>
      Math.max(3, ...cells.map(row => (row[ci] || '').length))
    );

    const headerRow = '| ' + cells[0].map((cell, ci) => padCell(cell, colWidths[ci])).join(' | ') + ' |';
    
    const separatorRow = '| ' + aligns.map((align, ci) => {
      const w = Math.max(3, colWidths[ci]);
      if (align === 'center') return ':' + '-'.repeat(w - 2) + ':';
      if (align === 'right') return '-'.repeat(w - 1) + ':';
      return '-'.repeat(w);
    }).join(' | ') + ' |';

    const dataRows = cells.slice(1).map(row =>
      '| ' + row.map((cell, ci) => padCell(cell || ' ', colWidths[ci])).join(' | ') + ' |'
    );

    return [headerRow, separatorRow, ...dataRows].join('\n');
  };

  const handleInsert = () => {
    onInsert(generateMarkdown());
    onClose();
  };

  const resetTable = () => {
    setCells(createEmptyGrid(3, 3));
    setAligns(Array(3).fill('left'));
    setRows(3);
    setCols(3);
  };

  if (!isOpen) return null;

  const alignLabel = { left: '←', center: '↔', right: '→' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-github-dark rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col border border-gray-200 dark:border-github-border theme-transition">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-github-border">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {initialData
              ? (lang === 'ru' ? 'Редактировать таблицу' : 'Edit Table')
              : (lang === 'ru' ? 'Генератор таблиц' : 'Table Generator')
            }
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-github-hover theme-transition">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 dark:border-github-border bg-gray-50 dark:bg-github-darker theme-transition">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>{lang === 'ru' ? 'Строки:' : 'Rows:'}</span>
            <button onClick={removeRow} disabled={rows <= 2} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-github-hover disabled:opacity-30"><Minus size={14} /></button>
            <span className="font-mono w-6 text-center">{rows}</span>
            <button onClick={addRow} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-github-hover"><Plus size={14} /></button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>{lang === 'ru' ? 'Столбцы:' : 'Cols:'}</span>
            <button onClick={removeCol} disabled={cols <= 1} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-github-hover disabled:opacity-30"><Minus size={14} /></button>
            <span className="font-mono w-6 text-center">{cols}</span>
            <button onClick={addCol} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-github-hover"><Plus size={14} /></button>
          </div>
          <button onClick={resetTable} className="text-xs text-gray-400 hover:text-red-500 ml-auto">
            {lang === 'ru' ? 'Сбросить' : 'Reset'}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="overflow-x-auto">
            <table className="border-collapse text-sm w-auto">
              <thead>
                <tr>
                  {Array.from({ length: cols }).map((_, ci) => (
                    <th key={`align-${ci}`} className="p-1 text-center">
                      <button
                        onClick={() => cycleAlign(ci)}
                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-github-hover text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 font-mono theme-transition"
                        title={lang === 'ru' ? 'Сменить выравнивание' : 'Change alignment'}
                      >
                        {alignLabel[aligns[ci]]}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cells.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={`${ri}-${ci}`} className="p-1">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => updateCell(ri, ci, e.target.value)}
                          placeholder={ri === 0 ? `Header ${ci + 1}` : ''}
                          className={`w-full min-w-[100px] px-2 py-1.5 rounded border text-sm outline-none theme-transition ${
                            ri === 0
                              ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 font-semibold text-gray-800 dark:text-gray-200'
                              : 'border-gray-200 dark:border-github-border bg-white dark:bg-github-dark text-gray-700 dark:text-gray-300'
                          } focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-github-darker border border-gray-200 dark:border-github-border font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-pre overflow-x-auto theme-transition">
            {generateMarkdown()}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-github-border">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-github-hover hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition">
            {t('modal.close')}
          </button>
          <button onClick={handleInsert} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2 shadow-sm transition-colors">
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

export default TableGenerator;
