import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Lora, Poppins } from 'next/font/google'

interface TitleH2Props {
    children: ReactNode;
    className?: string
}

const lora = Lora({ subsets: ['latin'], weight: '700' })
const poppins = Poppins({ subsets: ['latin'], weight: ['700', '800', '900'] })


export const TitleH2: React.FC<TitleH2Props> = ({ children, className }) => {
    return (
        // <h2 className={classNames(`text-xl md:text-2xl lg:text-3xl font-extrabold border-l-4 border-main pl-3  ${className}`, lora.className)}>
        <h2 className={classNames(`text-xl md:text-2xl lg:text-2xl font-semibold border-l-4 border-main pl-3  ${className}`, poppins.className)}>
            {children}
        </h2>
    );
};
