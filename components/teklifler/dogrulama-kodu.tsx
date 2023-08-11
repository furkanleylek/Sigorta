'use client'
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'

const DogrulamaKodu = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [isValidated, setIsValidated] = useState(false);

    const generateVerificationCode = () => {
        // Burada istediğiniz bir kod üretme mantığı kullanabilirsiniz
        const code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        setVerificationCode(code);
    };

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // İşlemleri doğrula
        if (verificationCode === captchaValue) {
            setIsValidated(true);
            console.log('Doğrulama başarılı, işlemlere devam edebilirsiniz.');
        } else {
            setIsValidated(false);
            console.log('Doğrulama kodu yanlış, lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64">
                <h1 className="text-xl mb-4">Doğrulama Kodu Sistemi</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Doğrulama Kodu: {verificationCode}
                        </label>
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={generateVerificationCode}
                        >
                            Yenile
                        </button>
                    </div>
                    <div className="mb-4">
                        <ReCAPTCHA
                            sitekey="YOUR_RECAPTCHA_SITE_KEY"
                            onChange={handleCaptchaChange}
                        />
                    </div>
                    {isValidated ? (
                        <p className="text-green-500 text-sm">Doğrulama başarılı, işlemlere devam edebilirsiniz.</p>
                    ) : (
                        <p className="text-red-500 text-sm">Doğrulama kodu yanlış, lütfen tekrar deneyin.</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DogrulamaKodu