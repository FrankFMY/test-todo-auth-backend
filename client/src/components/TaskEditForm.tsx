import React from 'react';
import Button from './Button';
import Input from './Input';
import { useFormField } from '../hooks/useFormField';

interface TaskEditFormProps {
    initialTitle: string;
    initialDescription?: string;
    onSave: (title: string, description: string) => void;
    onCancel: () => void;
    loading?: boolean;
}

const titleValidator = (v: string) =>
    !v.trim() ? 'Заголовок обязателен' : null;

const TaskEditForm: React.FC<TaskEditFormProps> = ({
    initialTitle,
    initialDescription = '',
    onSave,
    onCancel,
    loading,
}) => {
    const title = useFormField(initialTitle, [titleValidator]);
    const description = useFormField(initialDescription);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const err = title.validate();
        if (err) {
            title.setTouched(true);
            return;
        }
        onSave(title.value.trim(), description.value.trim());
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col md:flex-row gap-2 w-full'
        >
            <div className='flex-1'>
                <Input
                    type='text'
                    value={title.value}
                    onChange={title.onChange}
                    onBlur={title.onBlur}
                    className={
                        title.touched && title.error ? 'border-red-500' : ''
                    }
                    placeholder='Заголовок'
                    autoFocus
                />
                {title.touched && title.error && (
                    <div className='text-red-500 text-xs mt-1'>
                        {title.error}
                    </div>
                )}
            </div>
            <Input
                type='text'
                value={description.value}
                onChange={description.onChange}
                onBlur={description.onBlur}
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
        </form>
    );
};

export default TaskEditForm;
