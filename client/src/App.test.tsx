import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('рендерится форма входа', () => {
    render(<App />);
    expect(screen.getByText(/вход/i)).toBeInTheDocument();
});

