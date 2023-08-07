import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Lora } from 'next/font/google'

interface TitleH3Props {
    children: ReactNode;
    className?: string
}

const lora = Lora({ subsets: ['latin'], weight: '700' })

export const TitleH3: React.FC<TitleH3Props> = ({ children, className }) => {
    return (
        <h3 className={classNames(`text-xl md:text-2xl lg:text-3xl font-bold  ${className}`, lora.className)}>
            {children}
        </h3>
    );
};
