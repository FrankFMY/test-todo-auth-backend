const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware для проверки JWT
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Требуется авторизация' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded; // { id, email }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Недействительный токен' });
    }
};

// Пример использования:
// router.get('/private', auth, handler)
