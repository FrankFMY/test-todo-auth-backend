const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

const testUser = { email: 'testuser@example.com', password: 'testpass123' };

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Аутентификация', () => {
    afterEach(async () => {
        await User.deleteMany({});
    });

    test('Регистрация нового пользователя', async () => {
        const res = await request(app).post('/api/register').send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Регистрация успешна');
    });

    test('Ошибка при повторной регистрации', async () => {
        await request(app).post('/api/register').send(testUser);
        const res = await request(app).post('/api/register').send(testUser);
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toBe('Пользователь уже существует');
    });

    test('Вход с корректными данными', async () => {
        await request(app).post('/api/register').send(testUser);
        const res = await request(app).post('/api/login').send(testUser);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('Вход с неверным паролем', async () => {
        await request(app).post('/api/register').send(testUser);
        const res = await request(app)
            .post('/api/login')
            .send({ ...testUser, password: 'wrong' });
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Неверные email или пароль');
    });
});
