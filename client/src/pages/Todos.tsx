import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos';
import { Todo } from '../types/todo';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import ThemeToggle from '../components/ThemeToggle';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const Todos: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const { toasts, showToast, removeToast } = useToast();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchTodos();
        // eslint-disable-next-line
    }, [token]);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (e) {
            setError('Ошибка загрузки задач');
            showToast('Ошибка загрузки задач', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError('Заголовок обязателен');
            showToast('Заголовок обязателен', 'error');
            return;
        }
        setCreating(true);
        try {
            await createTodo({ title, description });
            setTitle('');
            setDescription('');
            fetchTodos();
            showToast('Задача добавлена', 'success');
        } catch (e) {
            setError('Ошибка создания задачи');
            showToast('Ошибка создания задачи', 'error');
        } finally {
            setCreating(false);
        }
    };

    const handleToggle = async (todo: Todo) => {
        setUpdatingId(todo._id);
        try {
            await updateTodo(todo._id, { completed: !todo.completed });
            fetchTodos();
            showToast('Статус задачи обновлён', 'success');
        } catch (e) {
            setError('Ошибка обновления');
            showToast('Ошибка обновления', 'error');
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteTodo(id);
            fetchTodos();
            showToast('Задача удалена', 'success');
        } catch (e) {
            setError('Ошибка удаления');
            showToast('Ошибка удаления', 'error');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors p-4'>
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    message={t.message}
                    type={t.type}
                    onClose={() => removeToast(t.id)}
                />
            ))}
            <div
                className='max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8 animate-fade-in'
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
                    <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight'>
                        Мои задачи
                    </h2>
                    <div className='flex items-center gap-3'>
                        <ThemeToggle />
                        <Button
                            onClick={logout}
                            className='text-sm bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-3 py-1'
                        >
                            Выйти
                        </Button>
                    </div>
                </div>
                <form
                    onSubmit={handleCreate}
                    className='flex flex-col md:flex-row gap-2 mb-6'
                >
                    <Input
                        type='text'
                        placeholder='Заголовок'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='flex-1'
                    />
                    <Input
                        type='text'
                        placeholder='Описание'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='flex-1'
                    />
                    <Button
                        type='submit'
                        loading={creating}
                        className='min-w-[120px]'
                    >
                        Добавить
                    </Button>
                </form>
                {error && <Alert type='error'>{error}</Alert>}
                {loading ? (
                    <div className='flex justify-center py-8'>
                        <Loader />
                    </div>
                ) : (
                    <ul className='space-y-3'>
                        {todos.map((todo) => (
                            <li
                                key={todo._id}
                                className={`flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 shadow-sm transition group border border-transparent hover:border-blue-400 dark:hover:border-blue-500 ${
                                    todo.completed ? 'opacity-60' : ''
                                }`}
                            >
                                <div className='flex items-center gap-3'>
                                    <button
                                        type='button'
                                        onClick={() => handleToggle(todo)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                            todo.completed
                                                ? 'bg-blue-500 border-blue-500'
                                                : 'border-gray-400 dark:border-gray-500'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                        aria-label='Выполнено'
                                        disabled={!!updatingId}
                                    >
                                        {updatingId === todo._id ? (
                                            <Loader className='w-4 h-4 border-2' />
                                        ) : todo.completed ? (
                                            <svg
                                                className='w-4 h-4 text-white'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='3'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M5 13l4 4L19 7'
                                                />
                                            </svg>
                                        ) : null}
                                    </button>
                                    <div>
                                        <span
                                            className={`font-semibold text-lg ${
                                                todo.completed
                                                    ? 'line-through text-gray-400 dark:text-gray-500'
                                                    : 'text-gray-900 dark:text-white'
                                            }`}
                                        >
                                            {todo.title}
                                        </span>
                                        {todo.description && (
                                            <div className='text-xs text-gray-500 dark:text-gray-300 mt-1'>
                                                {todo.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type='button'
                                    onClick={() => handleDelete(todo._id)}
                                    loading={deletingId === todo._id}
                                    className='text-xs bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 px-3 py-1'
                                >
                                    Удалить
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
                {!loading && todos.length === 0 && (
                    <div className='text-gray-500 dark:text-gray-300 text-center mt-6'>
                        Нет задач
                    </div>
                )}
            </div>
        </div>
    );
};

export default Todos;
