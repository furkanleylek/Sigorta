
import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string
}

const FormContainer: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={`border border-border shadow-md pt-4 px-3 lg:px-5 pb-6 rounded-xl space-y-4 relative bg-white ${className}`}>
            {children}
        </div>
    );
};

export default FormContainer;