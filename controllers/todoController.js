const Todo = require('../models/Todo');

// Создать задачу
exports.create = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const todo = await Todo.create({
            title,
            description,
            owner: req.user.id,
        });
        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
};

// Получить все задачи пользователя
exports.getAll = async (req, res, next) => {
    try {
        const todos = await Todo.find({ owner: req.user.id }).sort({
            createdAt: -1,
        });
        res.json(todos);
    } catch (err) {
        next(err);
    }
};

// Получить задачу по id (только если владелец)
exports.getById = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });
        if (!todo) return res.status(404).json({ error: 'Задача не найдена' });
        res.json(todo);
    } catch (err) {
        next(err);
    }
};

// Обновить задачу (только если владелец)
exports.update = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ error: 'Задача не найдена' });
        res.json(todo);
    } catch (err) {
        next(err);
    }
};

// Удалить задачу (только если владелец)
exports.remove = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id,
        });
        if (!todo) return res.status(404).json({ error: 'Задача не найдена' });
        res.json({ message: 'Задача удалена' });
    } catch (err) {
        next(err);
    }
};

// Пример использования:
// router.post('/', auth, create)
// router.get('/', auth, getAll)
// router.get('/:id', auth, getById)
// router.put('/:id', auth, update)
// router.delete('/:id', auth, remove)
