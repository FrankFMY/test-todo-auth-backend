import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

interface TaskEditFormProps {
    initialTitle: string;
    initialDescription?: string;
    onSave: (title: string, description: string) => void;
    onCancel: () => void;
    loading?: boolean;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
    initialTitle,
    initialDescription = '',
    onSave,
    onCancel,
    loading,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Заголовок обязателен');
            return;
        }
        setError('');
        onSave(title.trim(), description.trim());
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col md:flex-row gap-2 w-full'
        >
            <Input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='flex-1'
                placeholder='Заголовок'
                autoFocus
            />
            <Input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='flex-1'
                placeholder='Описание'
            />
            <Button
                type='submit'
                loading={loading}
                className='min-w-[90px]'
            >
                Сохранить
            </Button>
            <Button
                type='button'
                onClick={onCancel}
                className='min-w-[90px] bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700'
            >
                Отмена
            </Button>
            {error && (
                <div className='text-red-500 text-xs mt-1 w-full'>{error}</div>
            )}
        </form>
    );
};

export default TaskEditForm;
