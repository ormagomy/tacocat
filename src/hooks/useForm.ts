import {useState, ChangeEvent} from 'react';

type HTMLFormControls = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type UseForm = <T>(initialForm: T) => [T, (e: ChangeEvent<HTMLFormControls>) => void, (e: ChangeEvent<{name?: string | undefined; value: unknown}>) => void, () => void];

function isInput(x: any): x is HTMLInputElement {
    return x instanceof HTMLInputElement;
}

export const useForm: UseForm = (initialForm) => {
    const [form, setForm] = useState({...initialForm});

    const updateForm = (e: ChangeEvent<HTMLFormControls>) => {
        setForm({
            ...form,
            [e.target.name as string]: isInput(e.target) && e.target.type === 'number' ? e.target.valueAsNumber : e.target.value,
        });
    };

    const updateSelect = (e: ChangeEvent<{name?: string | undefined; value: unknown}>) => {
        setForm({
            ...form,
            [e.target.name as string]: e.target.value,
        });
    };

    const resetForm = () => setForm({...initialForm});

    return [form, updateForm, updateSelect, resetForm];
};
