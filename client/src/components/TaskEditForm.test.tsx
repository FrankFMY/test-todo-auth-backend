import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskEditForm from './TaskEditForm';

describe('TaskEditForm', () => {
    it('отображает начальные значения', () => {
        render(
            <TaskEditForm
                initialTitle='Заголовок'
                initialDescription='Описание'
                onSave={jest.fn()}
                onCancel={jest.fn()}
            />
        );
        expect(screen.getByDisplayValue('Заголовок')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Описание')).toBeInTheDocument();
    });

    it('вызывает onSave с новыми значениями', () => {
        const onSave = jest.fn();
        render(
            <TaskEditForm
                initialTitle='A'
                initialDescription='B'
                onSave={onSave}
                onCancel={jest.fn()}
            />
        );
        fireEvent.change(screen.getByPlaceholderText('Заголовок'), {
            target: { value: 'New title' },
        });
        fireEvent.change(screen.getByPlaceholderText('Описание'), {
            target: { value: 'New desc' },
        });
        fireEvent.click(screen.getByText('Сохранить'));
        expect(onSave).toHaveBeenCalledWith('New title', 'New desc');
    });

    it('валидация: не даёт сохранить пустой заголовок', () => {
        const onSave = jest.fn();
        render(
            <TaskEditForm
                initialTitle='A'
                onSave={onSave}
                onCancel={jest.fn()}
            />
        );
        fireEvent.change(screen.getByPlaceholderText('Заголовок'), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByText('Сохранить'));
        expect(onSave).not.toHaveBeenCalled();
        expect(screen.getByText('Заголовок обязателен')).toBeInTheDocument();
    });

    it('вызывает onCancel при нажатии Отмена', () => {
        const onCancel = jest.fn();
        render(
            <TaskEditForm
                initialTitle='A'
                onSave={jest.fn()}
                onCancel={onCancel}
            />
        );
        fireEvent.click(screen.getByText('Отмена'));
        expect(onCancel).toHaveBeenCalled();
    });
});
