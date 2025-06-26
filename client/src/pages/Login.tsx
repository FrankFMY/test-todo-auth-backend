import React from 'react';
import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Alert from '../components/Alert';
import { useFormField } from '../hooks/useFormField';

const emailValidator = (v: string) =>
    !v
        ? 'Email обязателен'
        : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(v)
        ? 'Некорректный email'
        : null;
const passwordValidator = (v: string) =>
    !v ? 'Пароль обязателен' : v.length < 6 ? 'Минимум 6 символов' : null;

const Login: React.FC = () => {
    const email = useFormField('', [emailValidator]);
    const password = useFormField('', [passwordValidator]);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { saveToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        email.validate();
        password.validate();
        if (email.error || password.error) return;
        setError('');
        setLoading(true);
        try {
            const res = await login({
                email: email.value,
                password: password.value,
            });
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
                noValidate
            >
                <h2 className='text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white tracking-tight'>
                    Вход
                </h2>
                {error && <Alert type='error'>{error}</Alert>}
                <div className='mb-4'>
                    <Input
                        type='email'
                        placeholder='Email'
                        value={email.value}
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        required
                        autoFocus
                        className={
                            email.touched && email.error ? 'border-red-500' : ''
                        }
                    />
                    {email.touched && email.error && (
                        <div className='text-red-500 text-xs mt-1'>
                            {email.error}
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    <PasswordInput
                        placeholder='Пароль'
                        value={password.value}
                        onChange={password.onChange}
                        onBlur={password.onBlur}
                        required
                        className={
                            password.touched && password.error
                                ? 'border-red-500'
                                : ''
                        }
                    />
                    {password.touched && password.error && (
                        <div className='text-red-500 text-xs mt-1'>
                            {password.error}
                        </div>
                    )}
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
