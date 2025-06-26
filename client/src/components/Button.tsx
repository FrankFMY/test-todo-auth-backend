import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    loading,
    children,
    className = '',
    ...props
}) => (
    <button
        className={`px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 ${className}`}
        disabled={loading || props.disabled}
        {...props}
    >
        {loading ? (
            <span className='animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full align-middle'></span>
        ) : null}
        {children}
    </button>
);

export default Button;
