const express = require('express');
const { body } = require('express-validator');
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Все маршруты защищены auth
router.use(auth);

// POST /api/todos — создать задачу
router.post(
    '/',
    [body('title').notEmpty().withMessage('Заголовок обязателен')],
    validate,
    todoController.create
);

// GET /api/todos — получить список своих задач
router.get('/', todoController.getAll);

// GET /api/todos/:id — получить задачу по id
router.get('/:id', todoController.getById);

// PUT /api/todos/:id — обновить задачу
router.put(
    '/:id',
    [
        body('title')
            .optional()
            .notEmpty()
            .withMessage('Заголовок не может быть пустым'),
    ],
    validate,
    todoController.update
);

// DELETE /api/todos/:id — удалить задачу
router.delete('/:id', todoController.remove);

module.exports = router;
