import React from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
}

const colorMap = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => (
    <div
        className={`fixed top-6 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in ${colorMap[type]} dark:bg-opacity-90`}
        role='alert'
        onClick={onClose}
        style={{ cursor: 'pointer', minWidth: 220 }}
    >
        <span className='font-medium'>{message}</span>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
            className='ml-2 text-white/80 hover:text-white text-lg font-bold'
            aria-label='Закрыть'
            tabIndex={0}
        >
            ×
        </button>
    </div>
);

export default Toast;
