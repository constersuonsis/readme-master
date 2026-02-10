export type Language = 'en' | 'ru';

export type Theme = 'light' | 'dark';

export interface Template {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  content: Record<Language, string>;
}

export interface BadgeCategory {
  name: string;
  badges: Badge[];
}

export interface Badge {
  label: string;
  url: string;
  markdown: string;
}

export interface Stats {
  chars: number;
  words: number;
  lines: number;
}
