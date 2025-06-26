// Запуск сервера и подключение к MongoDB
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

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

// Для запуска: node server.js
