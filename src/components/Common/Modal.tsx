'use client';
import React from 'react';
import { Button, Card, CardBody, CardFooter } from '@material-tailwind/react';
import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOk: () => void;
    header?: String;
    headerClassname?: string;
    contentContainerClassname?: string;
    footer?: React.ReactNode;
    containerClassname?: string;
};

export const Modal = ({
    children,
    header,
    footer,
    isOpen,
    onClose,
    onOk,
    headerClassname,
    contentContainerClassname,
    containerClassname,
}: Props) => {
    return (
        isOpen && (
            <div
                className={cn(
                    'absolute inset-0 z-[300] flex flex-row items-center justify-center bg-black/50 mx-auto px-4 sm:!px-0',
                    containerClassname
                )}
            >
                <Card
                    className={cn(
                        'w-full max-w-[700px] max-h-[500px] shadow-lg z-[400]'
                    )}
                >
                    {header && (
                        <div
                            className={cn(
                                'py-4 px-6 rounded-t-xl border-b border-black/5 flex flex-row items-center justify-between font-bold text-xl',
                                headerClassname
                            )}
                        >
                            <p>{header}</p>
                            <Button className="!w-fit p-0" onClick={onClose}>
                                <AiOutlineClose className="text-black w-5 h-5 " />
                            </Button>
                        </div>
                    )}
                    <CardBody
                        className={cn(
                            'overflow-scroll',
                            contentContainerClassname
                        )}
                    >
                        {children}
                    </CardBody>
                </Card>
            </div>
        )
    );
};

export default Modal;
