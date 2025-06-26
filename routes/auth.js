const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

const router = express.Router();

// POST /api/register
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Некорректный email'),
        body('password').isLength({ min: 6 }).withMessage('Минимум 6 символов'),
    ],
    validate,
    authController.register
);

// POST /api/login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Некорректный email'),
        body('password').exists().withMessage('Пароль обязателен'),
    ],
    validate,
    authController.login
);

module.exports = router;
