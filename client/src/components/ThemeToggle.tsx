import React, { useEffect, useState, useLayoutEffect } from 'react';

const THEME_KEY = 'theme';

function initTheme() {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        return true;
    }
    document.documentElement.classList.remove('dark');
    return false;
}

const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [dark, setDark] = useState(initTheme);

    useLayoutEffect(() => {
        setDark(initTheme());
    }, []);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem(THEME_KEY, 'light');
        }
    }, [dark]);

    return (
        <button
            type='button'
            aria-label='Переключить тему'
            onClick={() => setDark((v) => !v)}
            className={`p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow hover:shadow-md transition flex items-center justify-center ${className}`}
        >
            {dark ? (
                <svg
                    className='w-6 h-6 text-yellow-400'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                </svg>
            ) : (
                <svg
                    className='w-6 h-6 text-gray-700 dark:text-gray-200'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z'
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
