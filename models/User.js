const mongoose = require('mongoose');

// Схема пользователя
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);

// Пример использования:
// const User = require('./models/User');
// const user = await User.create({ email, password });
