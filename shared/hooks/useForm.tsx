import { useState, useCallback, useEffect } from 'react';

export function useForm<T extends { [K in keyof T]: string }>({
    defaultValues,
}: {
    defaultValues?: T | object;
}) {
    const [formData, setFormData] = useState<Partial<T>>(
        (defaultValues as T) || {},
    );
    // console.log(defaultValues);
    useEffect(() => {
        if (defaultValues) {
            setFormData(defaultValues);
        }
    }, [defaultValues]);

    const handleChange = useCallback(
        (name: keyof T) => (value: string) => {
            setFormData(prev => ({ ...prev, [name]: value }) as T);
        },
        [],
    );

    const register = useCallback(
        (name: keyof T) => {
            return {
                value: formData[name] || '',

                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChangeText: (text: string) => handleChange(name)(text),
            };
        },
        [formData, handleChange],
    );

    const resetForm = useCallback(() => {
        setFormData({} as T);
    }, []);

    const setValue = (values: T) => {
        setFormData(prev => ({ ...values, prev }));
    };

    return { register, formData, resetForm, setValue };
}
