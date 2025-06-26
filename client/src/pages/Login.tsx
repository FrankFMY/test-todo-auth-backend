import React, { useState } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { saveToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await login({ email, password });
            if (res.token) {
                saveToken(res.token);
                navigate('/todos');
            } else {
                setError(res.error || 'Ошибка входа');
            }
        } catch (err) {
            setError('Ошибка сервера');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-8 rounded shadow-md w-full max-w-sm'
            >
                <h2 className='text-2xl font-bold mb-6 text-center'>Вход</h2>
                {error && (
                    <div className='mb-4 text-red-600 text-sm'>{error}</div>
                )}
                <input
                    type='email'
                    placeholder='Email'
                    className='w-full mb-4 p-2 border rounded'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Пароль'
                    className='w-full mb-4 p-2 border rounded'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
                >
                    Войти
                </button>
                <div className='mt-4 text-center text-sm'>
                    Нет аккаунта?{' '}
                    <Link
                        to='/register'
                        className='text-blue-600 hover:underline'
                    >
                        Регистрация
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
