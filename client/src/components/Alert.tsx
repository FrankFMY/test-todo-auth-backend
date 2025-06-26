import React from 'react';

interface AlertProps {
    type?: 'error' | 'success' | 'info';
    children: React.ReactNode;
    className?: string;
}

const colorMap = {
    error: 'bg-red-100 text-red-700 border-red-400 dark:bg-red-900 dark:text-red-200',
    success:
        'bg-green-100 text-green-700 border-green-400 dark:bg-green-900 dark:text-green-200',
    info: 'bg-blue-100 text-blue-700 border-blue-400 dark:bg-blue-900 dark:text-blue-200',
};

const Alert: React.FC<AlertProps> = ({
    type = 'info',
    children,
    className = '',
}) => (
    <div
        className={`border-l-4 p-3 mb-2 rounded ${colorMap[type]} ${className}`}
    >
        {children}
    </div>
);

export default Alert;
