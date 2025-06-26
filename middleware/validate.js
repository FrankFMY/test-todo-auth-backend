const { validationResult } = require('express-validator');

// Middleware для обработки ошибок валидации
function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = validate;

// Пример использования:
// router.post('/route', [validator1, validator2], validate, controller)
