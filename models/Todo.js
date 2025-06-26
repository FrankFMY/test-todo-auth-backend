const mongoose = require('mongoose');

// Схема задачи
const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        completed: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
); // createdAt, updatedAt

module.exports = mongoose.model('Todo', todoSchema);

// Пример использования:
// const Todo = require('./models/Todo');
// const todo = await Todo.create({ title, owner });
