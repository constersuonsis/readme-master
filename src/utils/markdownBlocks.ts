// Detects and parses markdown blocks (tables and task lists) for inline editing

export interface BlockRange {
  type: 'table' | 'tasks';
  startLine: number;
  endLine: number;
}

export interface ParsedTable {
  headers: string[];
  aligns: ('left' | 'center' | 'right')[];
  rows: string[][];
}

export interface ParsedTask {
  text: string;
  done: boolean;
  indent: number;
}

export function detectBlocks(text: string): Map<number, BlockRange> {
  const lines = text.split('\n');
  const lineToBlock = new Map<number, BlockRange>();
  let i = 0;

  while (i < lines.length) {
    if (isTableRow(lines[i]) && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      const startLine = i;
      i += 2;
      while (i < lines.length && isTableRow(lines[i])) {
        i++;
      }
      const endLine = i - 1;
      const block: BlockRange = { type: 'table', startLine, endLine };
      for (let l = startLine; l <= endLine; l++) {
        lineToBlock.set(l, block);
      }
      continue;
    }

    if (isTaskLine(lines[i])) {
      const startLine = i;
      while (i < lines.length && isTaskLine(lines[i])) {
        i++;
      }
      const endLine = i - 1;
      const block: BlockRange = { type: 'tasks', startLine, endLine };
      for (let l = startLine; l <= endLine; l++) {
        lineToBlock.set(l, block);
      }
      continue;
    }

    i++;
  }

  return lineToBlock;
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 2;
}

function isSeparatorRow(line: string): boolean {
  const trimmed = line.trim();
  return /^\|[\s:]*-+[\s:]*(\|[\s:]*-*[\s:]*)*\|$/.test(trimmed);
}

function isTaskLine(line: string): boolean {
  return /^\s*-\s+\[(x| )\]\s/.test(line);
}

export function parseTable(lines: string[]): ParsedTable {
  if (lines.length < 2) {
    return { headers: ['Header 1'], aligns: ['left'], rows: [['']] };
  }

  const parseCells = (line: string): string[] => {
    return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  };

  const headers = parseCells(lines[0]);
  const separators = parseCells(lines[1]);
  
  const aligns: ('left' | 'center' | 'right')[] = separators.map(sep => {
    const s = sep.trim();
    if (s.startsWith(':') && s.endsWith(':')) return 'center';
    if (s.endsWith(':')) return 'right';
    return 'left';
  });

  while (aligns.length < headers.length) aligns.push('left');

  const rows = lines.slice(2).map(line => {
    const cells = parseCells(line);
    while (cells.length < headers.length) cells.push('');
    return cells.slice(0, headers.length);
  });

  if (rows.length === 0) {
    rows.push(Array(headers.length).fill(''));
  }

  return { headers, aligns, rows };
}

export function parseTasks(lines: string[]): ParsedTask[] {
  return lines.map(line => {
    const match = line.match(/^(\s*)-\s+\[(x| )\]\s(.*)/);
    if (!match) {
      return { text: line.trim(), done: false, indent: 0 };
    }
    const indent = Math.floor(match[1].length / 2);
    const done = match[2] === 'x';
    const text = match[3];
    return { text, done, indent };
  });
}

export function extractBlockText(text: string, block: BlockRange): string {
  const lines = text.split('\n');
  return lines.slice(block.startLine, block.endLine + 1).join('\n');
}
