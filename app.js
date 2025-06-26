// Импорт зависимостей
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
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

// Подключение к MongoDB и запуск сервера
mongoose
    .connect(config.mongoUri)
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

module.exports = app; // Для тестирования
