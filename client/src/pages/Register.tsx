import React, { useState } from 'react';
import { register } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
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
                    Регистрация
                </h2>
                {error && <Alert type='error'>{error}</Alert>}
                {success && <Alert type='success'>{success}</Alert>}
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
                        placeholder='Пароль (мин. 6 символов)'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                </div>
                <Button
                    type='submit'
                    loading={loading}
                    className='w-full mt-2'
                >
                    Зарегистрироваться
                </Button>
                <div className='mt-6 text-center text-sm text-gray-600 dark:text-gray-300'>
                    Уже есть аккаунт?{' '}
                    <Link
                        to='/login'
                        className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
                    >
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
