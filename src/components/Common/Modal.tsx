import React from 'react';
import { Button, Card, CardBody, CardFooter } from '@material-tailwind/react';
import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    header?: String;
    headerClassname?: string;
    contentContainerClassname?: string;
    footer?: React.ReactNode;
    containerClassname?: string;
};

const Modal = ({
    children,
    header = 'jhdasjdhask',
    footer,
    isOpen,
    onClose,
    headerClassname,
    contentContainerClassname,
    containerClassname,
}: Props) => {
    return (
        isOpen && (
            <div
                className={cn(
                    'fixed absolute inset-0 z-[9999] grid place-items-center ',
                    containerClassname
                )}
            >
                <Card
                    className={cn(
                        'w-full max-w-[700px] max-h-[500px] shadow-lg '
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
                    {footer && <CardFooter>{footer}</CardFooter>}
                </Card>
            </div>
        )
    );
};

export default Modal;
