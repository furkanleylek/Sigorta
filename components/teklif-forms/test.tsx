'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

type FormData = z.infer<typeof formSchema>;

const TestForm: React.FC = () => {
    const { handleSubmit, control, formState } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="birthDate">Doğum Tarihi</label>
                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="date"
                            className={`border rounded-md p-2 ${formState.errors.birthDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                    )}
                />
                {formState.errors.birthDate && (
                    <p className="text-red-500 text-sm">{formState.errors.birthDate.message}</p>
                )}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Gönder
            </button>
        </form>
    );
};

export default TestForm;
