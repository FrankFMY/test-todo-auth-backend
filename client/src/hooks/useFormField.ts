import { useState, useCallback } from 'react';

export type Validator = (value: string) => string | null;

export function useFormField(initial: string, validators: Validator[] = []) {
    const [value, setValue] = useState(initial);
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validate = useCallback(
        (val?: string) => {
            const v = val !== undefined ? val : value;
            for (const validator of validators) {
                const err = validator(v);
                if (err) {
                    setError(err);
                    return err;
                }
            }
            setError(null);
            return null;
        },
        [validators, value]
    );

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setValue(val);
            if (touched) validate(val);
        },
        [touched, validate]
    );

    const onBlur = useCallback(() => {
        setTouched(true);
        validate();
    }, [validate]);

    return {
        value,
        setValue,
        touched,
        error,
        onChange,
        onBlur,
        validate,
        setTouched,
    };
}
