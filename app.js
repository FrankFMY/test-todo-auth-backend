// Импорт зависимостей
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Импорт роутов
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();

// Разрешаем CORS для всех источников (для разработки)
app.use(cors());

// Middleware для парсинга JSON
app.use(express.json());

// Роуты
app.use('/api', authRoutes);
app.use('/api/todos', todoRoutes);

// Обработка ошибок (централизованно)
app.use(errorHandler);

module.exports = app; // Только Express-приложение, без запуска сервера
