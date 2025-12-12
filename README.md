# Practics - Заметки

Проект разделен на frontend и backend части.

## Структура проекта

```
practics/
├── frontend/          # Frontend часть (React)
│   ├── src/
│   │   ├── hooks/Notes/useNotes.jsx    # Хук для работы с заметками
│   │   ├── components/Notes/           # Компоненты заметок
│   │   │   ├── NoteForm.jsx            # Форма создания/редактирования
│   │   │   ├── NoteCard.jsx            # Карточка заметки
│   │   │   └── NotesList.jsx           # Список заметок
│   │   └── pages/Notes.jsx             # Страница заметок
│   ├── public/data/notes.json          # Данные (не используется)
│   └── package.json
└── backend/           # Backend часть (Express)
    ├── data/notes.json                 # Данные заметок
    ├── server.js                       # Сервер
    └── package.json
```

## Установка зависимостей

1. Установите зависимости для backend:
```bash
cd backend
npm install
```

2. Установите зависимости для frontend:
```bash
cd frontend
npm install
```

## Запуск

### Запуск по отдельности

1. Запустите backend сервер:
```bash
cd backend
npm run dev
```
Сервер будет доступен на http://localhost:3001

2. Запустите frontend:
```bash
cd frontend
npm run dev
```
Frontend будет доступен на http://localhost:5173

### Запуск обоих серверов одновременно

Из папки frontend:
```bash
npm run dev:both
```
