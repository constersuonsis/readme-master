# README Master

**A powerful, real-time Markdown editor with inline table and task management.**

[English](#english) | [Русский](#russian)

---

## English

**README Master** is a feature-rich Markdown editor built with modern web technologies. It allows you to create, edit, and preview Markdown files in real-time. With advanced features like inline table editing, task management, and professional templates, it's the perfect tool for crafting beautiful documentation.

### Features

- **Real-time Preview**: See your changes instantly as you type.
- **Dual-Pane Interface**: Edit on the left, preview on the right.
- **Inline Editing**:
  - **Table Generator**: Create and edit tables visually. Click the table icon in the gutter to edit existing tables.
  - **Task Manager**: Manage checklists easily. Click the checkbox icon to add, remove, or reorder tasks.
- **Professional Templates**: Start quickly with templates for READMEs, profiles, and more.
- **Toolbar**: Quick access to formatting (Bold, Italic, Headers, Lists, etc.).
- **Themes**: Switch between Light and Dark modes with a smooth transition.
- **Localization**: Fully localized interface in English and Russian.
- **Keyboard Shortcuts**: Productivity-boosting shortcuts (see below).

### Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/constersuonsis/readme-master.git
   cd readme-master
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

#### Basic Editing

Type standard Markdown in the left pane. The preview will update automatically. Use the toolbar at the top for quick formatting.

#### Inline Table Editing

1. Create a table using the **Table Generator** button in the toolbar.
2. To edit an existing table, hover over the table in the editor.
3. Click the **Table Icon** that appears in the left gutter (line numbers).
4. Edit cells, add/remove rows and columns, and change alignment in the modal.
5. Click **Update** to apply changes.

#### Inline Task Management

1. Create a task list using the **Task Manager** button.
2. To edit an existing list, hover over it in the editor.
3. Click the **Checkbox Icon** in the gutter.
4. Add, remove, indent/unindent, and mark tasks as done in the modal.

#### Keyboard Shortcuts

| Shortcut               | Action                      |
| :--------------------- | :-------------------------- |
| `Ctrl` + `B`           | **Bold**                    |
| `Ctrl` + `I`           | _Italic_                    |
| `Ctrl` + `K`           | [Link](url)                 |
| `Ctrl` + `Shift` + `C` | Code Block                  |
| `Ctrl` + `S`           | Save (triggers save action) |
| `Tab`                  | Indent (2 spaces)           |

### Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icons)
- [React Markdown](https://github.com/remarkjs/react-markdown)

### Credits

Made by [VK](https://vk.com/only_yours2021) · [GitHub](https://github.com/constersuonsis)

---

## Русский

**README Master** — это мощный редактор Markdown с современным веб-интерфейсом. Он позволяет создавать, редактировать и просматривать файлы Markdown в реальном времени. Благодаря продвинутым функциям, таким как визуальное редактирование таблиц, менеджер задач и профессиональные шаблоны, это идеальный инструмент для создания качественной документации.

### Возможности

- **Предпросмотр в реальном времени**: Видите изменения сразу же по мере ввода.
- **Двухпанельный интерфейс**: Редактор слева, предпросмотр справа.
- **Инлайн-редактирование**:
  - **Генератор таблиц**: Создавайте и редактируйте таблицы визуально. Нажмите на иконку таблицы рядом с номером строки, чтобы изменить существующую таблицу.
  - **Менеджер задач**: Управляйте чеклистами легко. Нажмите на иконку галочки, чтобы добавить, удалить или изменить порядок задач.
- **Профессиональные шаблоны**: Быстрый старт с шаблонами для README, профилей и другого.
- **Панель инструментов**: Быстрый доступ к форматированию (Жирный, Курсив, Заголовки, Списки и т.д.).
- **Темы**: Переключение между светлой и тёмной темой с плавной анимацией.
- **Локализация**: Полностью локализованный интерфейс на английском и русском языках.
- **Горячие клавиши**: Ускорьте работу с помощью клавиатуры (см. ниже).

### Начало работы

#### Требования

- [Node.js](https://nodejs.org/) (версия 16 или выше)

#### Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/constersuonsis/readme-master.git
   cd readme-master
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите сервер разработки:

   ```bash
   npm run dev
   ```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Использование

#### Основное редактирование

Пишите стандартный Markdown в левой панели. Предпросмотр обновляется автоматически. Используйте панель инструментов сверху для быстрого форматирования.

#### Редактирование таблиц

1. Создайте таблицу с помощью кнопки **Таблица** в панели инструментов.
2. Чтобы изменить существующую таблицу, наведите курсор на неё в редакторе.
3. Нажмите на **Иконку таблицы**, которая появится слева (в номерах строк).
4. Редактируйте ячейки, добавляйте/удаляйте строки и столбцы, меняйте выравнивание в модальном окне.
5. Нажмите **Обновить**, чтобы применить изменения.

#### Управление задачами

1. Создайте список задач с помощью кнопки **Задачи**.
2. Чтобы изменить существующий список, наведите на него курсор.
3. Нажмите на **Иконку галочки** слева.
4. Добавляйте, удаляйте, меняйте отступы и отмечайте задачи как выполненные в модальном окне.

#### Горячие клавиши

| Сочетание              | Действие           |
| :--------------------- | :----------------- |
| `Ctrl` + `B`           | **Жирный**         |
| `Ctrl` + `I`           | _Курсив_           |
| `Ctrl` + `K`           | [Ссылка](url)      |
| `Ctrl` + `Shift` + `C` | Блок кода          |
| `Ctrl` + `S`           | Сохранить          |
| `Tab`                  | Отступ (2 пробела) |

### Технологии

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Иконки)
- [React Markdown](https://github.com/remarkjs/react-markdown)

### Автор

Сделано [VK](https://vk.com/only_yours2021) · [GitHub](https://github.com/constersuonsis)
