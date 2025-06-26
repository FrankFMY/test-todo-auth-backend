import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';

describe('useToast', () => {
    jest.useFakeTimers();

    it('добавляет toast и удаляет по таймеру', () => {
        const { result } = renderHook(() => useToast(1000));
        act(() => {
            result.current.showToast('Hello', 'success');
        });
        expect(result.current.toasts.length).toBe(1);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(result.current.toasts.length).toBe(0);
    });

    it('удаляет toast вручную', () => {
        const { result } = renderHook(() => useToast(5000));
        act(() => {
            result.current.showToast('Manual', 'info');
        });
        const id = result.current.toasts[0].id;
        act(() => {
            result.current.removeToast(id);
        });
        expect(result.current.toasts.length).toBe(0);
    });
});
