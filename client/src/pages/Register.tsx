import React, { useState } from 'react';
import { register } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await register({ email, password });
            if (res.message) {
                setSuccess('Регистрация успешна!');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                setError(res.error || 'Ошибка регистрации');
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
                <h2 className='text-2xl font-bold mb-6 text-center'>
                    Регистрация
                </h2>
                {error && (
                    <div className='mb-4 text-red-600 text-sm'>{error}</div>
                )}
                {success && (
                    <div className='mb-4 text-green-600 text-sm'>{success}</div>
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
                    placeholder='Пароль (мин. 6 символов)'
                    className='w-full mb-4 p-2 border rounded'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                />
                <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
                >
                    Зарегистрироваться
                </button>
                <div className='mt-4 text-center text-sm'>
                    Уже есть аккаунт?{' '}
                    <Link
                        to='/login'
                        className='text-blue-600 hover:underline'
                    >
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
