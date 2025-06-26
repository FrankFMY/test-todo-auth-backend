import React, { useState } from 'react';

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    className = '',
    ...props
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={`relative w-full ${className}`}>
            <input
                type={visible ? 'text' : 'password'}
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 pr-10'
                {...props}
            />
            <button
                type='button'
                tabIndex={-1}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none'
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
            >
                {visible ? (
                    <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.13 0 2.21.195 3.225.555M19.07 4.93A9.953 9.953 0 0121 12c0 1.657-.406 3.22-1.125 4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                    </svg>
                ) : (
                    <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-6.828A9.956 9.956 0 0121 12c0 3-4 7-9 7-1.657 0-3.22-.406-4.575-1.125M4.93 4.93A9.953 9.953 0 003 12c0 1.657.406 3.22 1.125 4.575M9 12a3 3 0 016 0'
                        />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default PasswordInput;
