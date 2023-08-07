import React, { ReactNode } from 'react';

interface ParagraphProps {
    children: ReactNode;
    className?: string
}

export const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
    return (
        <p className={`leading-normal text-xs md:text-sm whitespace-break-spaces tracking-wide  ${className}`}>
            {children}
        </p>
    );
};
