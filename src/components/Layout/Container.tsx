'use client';
import React from 'react';
import cn from 'classnames';

type Props = {
    children: React.ReactNode;
    classname?: string;
    fluid?: boolean;
};

const Container = ({ children, classname, fluid }: Props) => {
    return (
        <div
            className={cn(
                'container mx-auto',
                fluid ? 'max-w-[min(100%,1920px)] px-0' : '',
                classname
            )}
        >
            {children}
        </div>
    );
};

export default Container;
