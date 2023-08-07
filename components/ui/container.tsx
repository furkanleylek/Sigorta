import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={`container px-4 md:px-20 lg:px-40 w-full py-4 space-y-10  ${className}`}>
            {children}
        </div>
    );
};

export default Container;