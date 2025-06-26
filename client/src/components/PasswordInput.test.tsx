import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
    it('отображает значение и меняет тип при клике на иконку', () => {
        render(
            <PasswordInput
                value='secret'
                onChange={() => {}}
            />
        );
        const input = screen.getByDisplayValue('secret');
        expect(input).toHaveAttribute('type', 'password');
        fireEvent.click(screen.getByLabelText('Показать пароль'));
        expect(input).toHaveAttribute('type', 'text');
        fireEvent.click(screen.getByLabelText('Скрыть пароль'));
        expect(input).toHaveAttribute('type', 'password');
    });

    it('вызывает onChange при вводе', () => {
        const onChange = jest.fn();
        render(
            <PasswordInput
                value=''
                onChange={onChange}
                placeholder='Пароль'
            />
        );
        const input = screen.getByPlaceholderText('Пароль');
        fireEvent.change(input, {
            target: { value: '123' },
        });
        expect(onChange).toHaveBeenCalled();
    });
});
