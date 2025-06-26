import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
    it('renders message and closes on click', () => {
        const onClose = jest.fn();
        render(
            <Toast
                message='Test message'
                type='success'
                onClose={onClose}
            />
        );
        expect(screen.getByText('Test message')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('alert'));
        expect(onClose).toHaveBeenCalled();
    });

    it('renders close button and closes on button click', () => {
        const onClose = jest.fn();
        render(
            <Toast
                message='Close me'
                type='error'
                onClose={onClose}
            />
        );
        fireEvent.click(screen.getByLabelText('Закрыть'));
        expect(onClose).toHaveBeenCalled();
    });

    it('applies correct color for type', () => {
        const { rerender } = render(
            <Toast
                message='Info'
                type='info'
                onClose={() => {}}
            />
        );
        expect(screen.getByRole('alert').className).toMatch(/bg-blue-500/);
        rerender(
            <Toast
                message='Success'
                type='success'
                onClose={() => {}}
            />
        );
        expect(screen.getByRole('alert').className).toMatch(/bg-green-500/);
        rerender(
            <Toast
                message='Error'
                type='error'
                onClose={() => {}}
            />
        );
        expect(screen.getByRole('alert').className).toMatch(/bg-red-500/);
    });
});
