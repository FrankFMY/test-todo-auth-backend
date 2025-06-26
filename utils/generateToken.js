const jwt = require('jsonwebtoken');
const config = require('../config');

// Генерация JWT для пользователя
function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
        expiresIn: '7d',
    });
}

module.exports = generateToken;

// Пример использования:
// const token = generateToken(user);
