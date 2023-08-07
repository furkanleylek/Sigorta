import React, { ReactNode } from 'react';
import Link from 'next/link';
interface ButtonFirstProps {
    children: ReactNode;
    linkHref: string
}

const ButtonFirst: React.FC<ButtonFirstProps> = ({ children, linkHref }) => {
    return (
        <Link href={linkHref}>
            <button className='border border-border rounded-full px-6 py-3 text-xs
             button bg-auto relative before:bg-main text-primary hover:text-secondary before:text-secondary overflow-hidden h-12'>
                <span className='relative z-10'>
                    {children}
                </span>
            </button>
        </Link>

    );
};

export default ButtonFirst;