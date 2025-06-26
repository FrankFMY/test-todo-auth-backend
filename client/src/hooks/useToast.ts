import { useCallback, useState } from 'react';
import { ToastType } from '../components/Toast';

export interface ToastData {
    id: number;
    message: string;
    type: ToastType;
}

export function useToast(timeout = 3000) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const showToast = useCallback(
        (message: string, type: ToastType = 'info') => {
            const id = Date.now() + Math.random();
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, timeout);
        },
        [timeout]
    );

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, showToast, removeToast };
}
