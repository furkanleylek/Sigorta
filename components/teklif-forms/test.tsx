import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    tcKimlik: z.string().refine((value) => value.length === 11 && /^\d+$/.test(value)),
});

function TestForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Sadece rakamları al

        if (numericValue.length > 11) {
            return;
        }

        e.target.value = numericValue;
    };

    const onSubmit = () => {
        console.log('Girilen TC kimlik numarası:');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64">
                <h1 className="text-xl mb-4">TC Kimlik Numarası Girin</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            TC Kimlik Numarası
                        </label>
                        <Controller
                            name="tcKimlik"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={11}
                                    placeholder="Örn: 12345678901"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.tcKimlik ? 'border-red-500' : ''
                                        }`}
                                    onChange={onInputChange}
                                />
                            )}
                        />
                        {errors.tcKimlik ? (
                            <p className="text-red-500 text-xs italic mt-2">Geçersiz TC kimlik numarası!</p>
                        ) : (
                            <p className="text-gray-500 text-xs italic mt-2">11 adet rakam girmeniz gerekiyor.</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TestForm;
