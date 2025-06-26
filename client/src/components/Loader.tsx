import React from 'react';

const Loader: React.FC<{ className?: string }> = ({ className = '' }) => (
    <span
        className={`inline-block w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin ${className}`}
        aria-label='Загрузка...'
    />
);

export default Loader;
