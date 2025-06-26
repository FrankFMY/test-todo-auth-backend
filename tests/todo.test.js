const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Todo = require('../models/Todo');

const testUser = { email: 'todo@example.com', password: 'todo12345' };
let token;

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb');
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('CRUD задач', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await Todo.deleteMany({});
        await request(app).post('/api/register').send(testUser);
        const res = await request(app).post('/api/login').send(testUser);
        token = res.body.token;
    });

    test('Создание задачи', async () => {
        const res = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test todo', description: 'desc' });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test todo');
        expect(res.body.completed).toBe(false);
    });

    test('Получение списка задач', async () => {
        await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test todo' });
        const res = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
    });

    test('Получение задачи по id', async () => {
        const createRes = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test todo' });
        const id = createRes.body._id;
        const res = await request(app)
            .get(`/api/todos/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(id);
    });

    test('Обновление задачи', async () => {
        const createRes = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test todo' });
        const id = createRes.body._id;
        const res = await request(app)
            .put(`/api/todos/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated', completed: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated');
        expect(res.body.completed).toBe(true);
    });

    test('Удаление задачи', async () => {
        const createRes = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test todo' });
        const id = createRes.body._id;
        const res = await request(app)
            .delete(`/api/todos/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Задача удалена');
    });

    test('Доступ к чужой задаче запрещён', async () => {
        // Создаём задачу одним пользователем
        const createRes = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test todo' });
        const id = createRes.body._id;
        // Регистрируем второго пользователя
        const user2 = { email: 'other@example.com', password: 'other12345' };
        await request(app).post('/api/register').send(user2);
        const login2 = await request(app).post('/api/login').send(user2);
        const token2 = login2.body.token;
        // Пытаемся получить задачу чужим токеном
        const res = await request(app)
            .get(`/api/todos/${id}`)
            .set('Authorization', `Bearer ${token2}`);
        expect(res.statusCode).toBe(404);
    });
});
