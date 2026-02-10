import { Template, Language } from './types';

export const INITIAL_MARKDOWN = `# Welcome to README Master

Start editing to see the magic happen! 

## Features
- 📝 **Real-time Preview**: See changes instantly
- 🌓 **Dark Mode**: Easy on the eyes
- 💾 **Auto-save**: Never lose your work
- 📋 **Templates**: Jump start your documentation

## Code Example
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
`;

export const TEMPLATES: Template[] = [
  {
    id: 'minimal',
    name: { en: 'Minimal', ru: 'Минимальный' },
    description: { en: 'Simple structure for small projects', ru: 'Простая структура для небольших проектов' },
    content: {
      en: `# Project Name

Short description of the project.

## Installation
\`\`\`bash
npm install project-name
\`\`\`

## Usage
\`\`\`javascript
import project from 'project-name';
project.doSomething();
\`\`\`
`,
      ru: `# Название проекта

Краткое описание проекта.

## Установка
\`\`\`bash
npm install project-name
\`\`\`

## Использование
\`\`\`javascript
import project from 'project-name';
project.doSomething();
\`\`\`
`
    }
  },
  {
    id: 'standard',
    name: { en: 'Standard', ru: 'Стандартный' },
    description: { en: 'Standard GitHub README structure', ru: 'Стандартная структура README для GitHub' },
    content: {
      en: `# Project Title

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

One paragraph description of the project.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

\`\`\`bash
git clone https://github.com/user/project.git
cd project
npm install
\`\`\`

## Usage
Explain how to use your project here.

## Features
- Feature 1
- Feature 2
- Feature 3

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
`,
      ru: `# Название проекта

[![Лицензия](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Описание проекта в одном абзаце.

## Содержание
- [Установка](#установка)
- [Использование](#использование)
- [Функции](#функции)
- [Вклад](#вклад)
- [Лицензия](#лицензия)

## Установка

\`\`\`bash
git clone https://github.com/user/project.git
cd project
npm install
\`\`\`

## Использование
Расскажите, как использовать ваш проект.

## Функции
- Функция 1
- Функция 2
- Функция 3

## Вклад
Pull request'ы приветствуются. Для крупных изменений сначала создайте issue для обсуждения.

## Лицензия
[MIT](https://choosealicense.com/licenses/mit/)
`
    }
  },
  {
    id: 'awesome',
    name: { en: 'Awesome List', ru: 'Awesome-список' },
    description: { en: 'Curated list of awesome things', ru: 'Курируемый список полезных ресурсов' },
    content: {
      en: `# Awesome Project [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of awesome things related to Project.

## Contents
- [Libraries](#libraries)
- [Resources](#resources)
- [Tools](#tools)

## Libraries
- [LibName](http://example.com) - Description of library.

## Resources
- [ResourceName](http://example.com) - Description.

## Tools
- [ToolName](http://example.com) - Description.
`,
      ru: `# Awesome-проект [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Курируемый список полезных ресурсов, связанных с проектом.

## Содержание
- [Библиотеки](#библиотеки)
- [Ресурсы](#ресурсы)
- [Инструменты](#инструменты)

## Библиотеки
- [Название](http://example.com) - Описание библиотеки.

## Ресурсы
- [Название](http://example.com) - Описание.

## Инструменты
- [Название](http://example.com) - Описание.
`
    }
  },
  {
    id: 'library',
    name: { en: 'Library / Package', ru: 'Библиотека / Пакет' },
    description: { en: 'Documentation for a library or npm package', ru: 'Документация для библиотеки или npm-пакета' },
    content: {
      en: `# package-name

[![npm version](https://img.shields.io/npm/v/package-name.svg)](https://www.npmjs.com/package/package-name)
[![Downloads](https://img.shields.io/npm/dm/package-name.svg)](https://www.npmjs.com/package/package-name)

A brief description of what this library does.

## Installation

\`\`\`bash
npm install package-name
# or
yarn add package-name
\`\`\`

## Quick Start

\`\`\`javascript
import { myFunction } from 'package-name';

const result = myFunction('hello');
console.log(result);
\`\`\`

## API Reference

### \`myFunction(input: string): string\`

| Parameter | Type     | Description          |
|-----------|----------|----------------------|
| input     | \`string\` | The input to process |

**Returns**: \`string\` — The processed result.

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing\`)
5. Open a Pull Request

## License

MIT © [Your Name](https://github.com/yourname)
`,
      ru: `# package-name

[![npm версия](https://img.shields.io/npm/v/package-name.svg)](https://www.npmjs.com/package/package-name)
[![Загрузки](https://img.shields.io/npm/dm/package-name.svg)](https://www.npmjs.com/package/package-name)

Краткое описание того, что делает эта библиотека.

## Установка

\`\`\`bash
npm install package-name
# или
yarn add package-name
\`\`\`

## Быстрый старт

\`\`\`javascript
import { myFunction } from 'package-name';

const result = myFunction('hello');
console.log(result);
\`\`\`

## Справочник API

### \`myFunction(input: string): string\`

| Параметр | Тип      | Описание              |
|----------|----------|-----------------------|
| input    | \`string\` | Входные данные        |

**Возвращает**: \`string\` — Обработанный результат.

## Участие в разработке

1. Сделайте форк репозитория
2. Создайте ветку (\`git checkout -b feature/amazing\`)
3. Закоммитьте изменения (\`git commit -m 'Добавлена функция'\`)
4. Отправьте ветку (\`git push origin feature/amazing\`)
5. Откройте Pull Request

## Лицензия

MIT © [Ваше имя](https://github.com/yourname)
`
    }
  },
  {
    id: 'opensource',
    name: { en: 'Open Source Project', ru: 'Open Source проект' },
    description: { en: 'Full-featured open source project README', ru: 'Полноценный README для open source проекта' },
    content: {
      en: `# Project Name

![Project Logo](https://via.placeholder.com/200)

[![Stars](https://img.shields.io/github/stars/user/repo?style=social)](#)
[![Forks](https://img.shields.io/github/forks/user/repo?style=social)](#)
[![License](https://img.shields.io/github/license/user/repo)](#)
[![Build Status](https://img.shields.io/github/actions/workflow/status/user/repo/ci.yml)](#)

> A short, compelling description of the project.

## ✨ Features

- 🚀 Feature one
- 📦 Feature two
- 🔧 Feature three

## 📋 Prerequisites

- Node.js >= 18
- npm or yarn

## 🚀 Getting Started

\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
npm start
\`\`\`

## 📖 Documentation

Visit the [docs](https://example.com/docs) for detailed documentation.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License — see [LICENSE](LICENSE).

## 🙏 Acknowledgements

- [Dependency 1](https://example.com)
- [Dependency 2](https://example.com)
`,
      ru: `# Название проекта

![Логотип проекта](https://via.placeholder.com/200)

[![Звёзды](https://img.shields.io/github/stars/user/repo?style=social)](#)
[![Форки](https://img.shields.io/github/forks/user/repo?style=social)](#)
[![Лицензия](https://img.shields.io/github/license/user/repo)](#)
[![Сборка](https://img.shields.io/github/actions/workflow/status/user/repo/ci.yml)](#)

> Краткое и ёмкое описание проекта.

## ✨ Функциональность

- 🚀 Функция один
- 📦 Функция два
- 🔧 Функция три

## 📋 Требования

- Node.js >= 18
- npm или yarn

## 🚀 Начало работы

\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
npm start
\`\`\`

## 📖 Документация

Подробная документация доступна по [ссылке](https://example.com/docs).

## 🤝 Участие в разработке

Мы приветствуем вклад! Ознакомьтесь с [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 Лицензия

Проект распространяется под лицензией MIT — см. [LICENSE](LICENSE).

## 🙏 Благодарности

- [Зависимость 1](https://example.com)
- [Зависимость 2](https://example.com)
`
    }
  },
  {
    id: 'profile',
    name: { en: 'GitHub Profile', ru: 'Профиль GitHub' },
    description: { en: 'Personal GitHub profile README', ru: 'README для личного профиля GitHub' },
    content: {
      en: `# Hi there, I'm [Your Name] 👋

## 🚀 About Me
I'm a passionate developer who loves building awesome things.

## 🛠️ Tech Stack
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)

## 📊 GitHub Stats
![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)

## 📫 How to reach me
- 🌐 [Website](https://yourwebsite.com)
- 💼 [LinkedIn](https://linkedin.com/in/yourname)
- 🐦 [Twitter](https://twitter.com/yourhandle)
`,
      ru: `# Привет, я [Ваше имя] 👋

## 🚀 Обо мне
Я разработчик, увлечённый созданием классных вещей.

## 🛠️ Технологии
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)

## 📊 Статистика GitHub
![Статистика GitHub](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)

## 📫 Связаться со мной
- 🌐 [Сайт](https://yourwebsite.com)
- 💼 [LinkedIn](https://linkedin.com/in/yourname)
- 🐦 [Twitter](https://twitter.com/yourhandle)
`
    }
  }
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'README Master',
    'action.new': 'New document',
    'action.open': 'Open file',
    'action.save': 'Download as .md',
    'action.export': 'Export',
    'action.copy': 'Copy Markdown to clipboard',
    'action.copyHtml': 'Copy HTML',
    'action.print': 'Print / PDF',
    'editor.placeholder': 'Type your markdown here...',
    'preview.title': 'Preview',
    'editor.title': 'Editor',
    'stats.chars': 'chars',
    'stats.words': 'words',
    'stats.lines': 'lines',
    'modal.templates.title': 'Choose a Template',
    'modal.badges.title': 'Badge Generator',
    'modal.close': 'Close',
    'modal.apply': 'Apply Template',
    'modal.insert': 'Insert Badge',
    'toast.copied': 'Copied to clipboard!',
    'toast.saved': 'Saved successfully!',
    'toast.loaded': 'File loaded!',
    'alert.unsaved': 'You have unsaved changes. Create new file?',
    'toolbar.bold': 'Bold (Ctrl+B)',
    'toolbar.italic': 'Italic (Ctrl+I)',
    'toolbar.strikethrough': 'Strikethrough',
    'toolbar.link': 'Link (Ctrl+K)',
    'toolbar.code': 'Code Block (Ctrl+Shift+C)',
    'toolbar.quote': 'Quote',
    'toolbar.list': 'Unordered List',
    'toolbar.orderedList': 'Ordered List',
    'toolbar.check': 'Task List',
    'toolbar.table': 'Table',
    'toolbar.image': 'Image',
    'toolbar.header': 'Header',
    'toolbar.hr': 'Horizontal Rule',
    'settings.theme': 'Toggle theme (Light / Dark)',
    'settings.language': 'Switch language (EN / RU)',
  },
  ru: {
    'app.title': 'README Master',
    'action.new': 'Новый документ',
    'action.open': 'Открыть файл',
    'action.save': 'Скачать как .md',
    'action.export': 'Экспорт',
    'action.copy': 'Скопировать Markdown в буфер',
    'action.copyHtml': 'Копировать HTML',
    'action.print': 'Печать / PDF',
    'editor.placeholder': 'Введите ваш markdown здесь...',
    'preview.title': 'Предпросмотр',
    'editor.title': 'Редактор',
    'stats.chars': 'симв.',
    'stats.words': 'слов',
    'stats.lines': 'строк',
    'modal.templates.title': 'Выберите шаблон',
    'modal.badges.title': 'Генератор бейджей',
    'modal.close': 'Закрыть',
    'modal.apply': 'Применить шаблон',
    'modal.insert': 'Вставить бейдж',
    'toast.copied': 'Скопировано в буфер!',
    'toast.saved': 'Успешно сохранено!',
    'toast.loaded': 'Файл загружен!',
    'alert.unsaved': 'У вас есть несохраненные изменения. Создать новый?',
    'toolbar.bold': 'Жирный (Ctrl+B)',
    'toolbar.italic': 'Курсив (Ctrl+I)',
    'toolbar.strikethrough': 'Зачёркнутый',
    'toolbar.link': 'Ссылка (Ctrl+K)',
    'toolbar.code': 'Блок кода (Ctrl+Shift+C)',
    'toolbar.quote': 'Цитата',
    'toolbar.list': 'Маркированный список',
    'toolbar.orderedList': 'Нумерованный список',
    'toolbar.check': 'Список задач',
    'toolbar.table': 'Таблица',
    'toolbar.image': 'Изображение',
    'toolbar.header': 'Заголовок',
    'toolbar.hr': 'Горизонтальная линия',
    'settings.theme': 'Переключить тему (Светлая / Тёмная)',
    'settings.language': 'Сменить язык (EN / RU)',
  }
};
