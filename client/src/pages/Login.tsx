import React, { useState } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { saveToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors'>
            <form
                onSubmit={handleSubmit}
                className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm animate-fade-in'
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
            >
                <h2 className='text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white tracking-tight'>
                    Вход
                </h2>
                {error && <Alert type='error'>{error}</Alert>}
                <div className='mb-4'>
                    <Input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className='mb-4'>
                    <Input
                        type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button
                    type='submit'
                    loading={loading}
                    className='w-full mt-2'
                >
                    Войти
                </Button>
                <div className='mt-6 text-center text-sm text-gray-600 dark:text-gray-300'>
                    Нет аккаунта?{' '}
                    <Link
                        to='/register'
                        className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
                    >
                        Регистрация
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
