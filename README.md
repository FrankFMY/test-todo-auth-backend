# ToDo List API (ExpressJS + MongoDB + React + TypeScript)

## Описание

REST API и современный SPA-интерфейс для управления задачами с аутентификацией пользователей (JWT).

## Запуск backend

1. Установите зависимости:
    ```
    npm install
    ```
2. Запустите MongoDB (по умолчанию: mongodb://localhost:27017/testdb)
3. Запустите сервер:
    ```
    npm run dev
    ```

## Переменные окружения backend (.env или config.js)

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/testdb
JWT_SECRET=your_jwt_secret
```

## Запуск frontend

1. Перейдите в папку client:
    ```
    cd client
    ```
2. Установите зависимости:
    ```
    npm install
    ```
3. Создайте файл .env и укажите адрес backend:
    ```
    REACT_APP_API_URL=http://localhost:3000/api
    ```
4. Запустите фронтенд:
    ```
    npm start
    ```

## Основные маршруты

### Аутентификация

-   **POST /api/register** — регистрация
    -   Тело: `{ "email": "user@mail.com", "password": "123456" }`
-   **POST /api/login** — вход
    -   Тело: `{ "email": "user@mail.com", "password": "123456" }`
    -   Ответ: `{ "token": "..." }`

### Задачи (требуется JWT в заголовке Authorization: Bearer ...)

-   **POST /api/todos** — создать задачу
    -   Тело: `{ "title": "Задача", "description": "Описание" }`
-   **GET /api/todos** — получить список своих задач
-   **GET /api/todos/:id** — получить задачу по id
-   **PUT /api/todos/:id** — обновить задачу
    -   Тело: `{ "title": "Новое имя", "completed": true }`
-   **DELETE /api/todos/:id** — удалить задачу

## Структура монорепозитория

-   backend: корень проекта (Express, Mongoose, тесты)
-   frontend: папка client (React, TypeScript, TailwindCSS)

## Тесты

-   backend: `npm test`
-   frontend: ручное тестирование (или добавить React Testing Library)

## Пример запроса (cURL)

```
# Регистрация
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"email":"user@mail.com","password":"123456"}'

# Логин
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email":"user@mail.com","password":"123456"}'

# Создать задачу
curl -X POST http://localhost:3000/api/todos -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"title":"Задача"}'
```
