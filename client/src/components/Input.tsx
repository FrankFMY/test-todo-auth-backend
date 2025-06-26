import React from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
    className = '',
    ...props
}) => (
    <input
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 ${className}`}
        {...props}
    />
);

export default Input;
