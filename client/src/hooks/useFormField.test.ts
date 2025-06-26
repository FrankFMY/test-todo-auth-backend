import { renderHook, act } from '@testing-library/react';
import { useFormField } from './useFormField';

describe('useFormField', () => {
    it('инициализируется с начальными значениями', () => {
        const { result } = renderHook(() => useFormField('init'));
        expect(result.current.value).toBe('init');
        expect(result.current.touched).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('onChange обновляет value', () => {
        const { result } = renderHook(() => useFormField(''));
        act(() => {
            result.current.onChange({ target: { value: 'abc' } } as any);
        });
        expect(result.current.value).toBe('abc');
    });

    it('onBlur выставляет touched и валидирует', () => {
        const { result } = renderHook(() =>
            useFormField('', [(v) => (!v ? 'err' : null)])
        );
        act(() => {
            result.current.onBlur();
        });
        expect(result.current.touched).toBe(true);
        expect(result.current.error).toBe('err');
    });

    it('validate возвращает ошибку и выставляет error', () => {
        const { result } = renderHook(() =>
            useFormField('', [(v) => (!v ? 'err' : null)])
        );
        let err;
        act(() => {
            err = result.current.validate();
        });
        expect(err).toBe('err');
        expect(result.current.error).toBe('err');
    });
});
