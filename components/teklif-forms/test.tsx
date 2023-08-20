
'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { Input } from '../ui/input';

type FormData = {
    pdfFile: File;
};

const TestForm: React.FC = () => {
    const { register, handleSubmit, formState } = useForm<FormData>();
    const onSubmit = async (data: unknown) => {
        try {
            const formData = data as FormData;
            console.log("formData:", formData.pdfFile.name)
            console.log("formData.pdfFile.type :", formData.pdfFile.lastModified)
            if (formData.pdfFile.type !== 'application/pdf') {
                console.log("PDF OLMASI ŞARTTIR")
            }

            // const formDataToSend = new FormData();
            // formDataToSend.append('pdfFile', formData.pdfFile);

            // const response = await axios.post('/upload', formDataToSend);

            // console.log('Dosya yüklendi:', response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
            <label className="block mb-2 font-semibold">PDF Dosyası Yükle</label>
            <Input
                type="file"
                {...register('pdfFile', {
                    required: 'PDF dosyası gereklidir.',
                })}
                accept=".pdf"
            />
            {formState.errors.pdfFile && (
                <p className="text-red-500">{formState.errors.pdfFile.message}</p>
            )}
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                disabled={formState.isSubmitting}
            >
                Yükle
            </button>
        </form>
    );
};

export default TestForm;
