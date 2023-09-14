import React, { useRef } from 'react';
import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import useClickOutside from '@/hooks/useClickOutside';
type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOk?: () => void;
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
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        isOpen && (
            <div
                className={cn(
                    'absolute inset-0 z-[300 grid place-items-center bg-black/50 px-4 sm:px-0 ',
                    containerClassname
                )}
            >
                <div
                    className={cn(
                        'w-full max-w-[700px] shadow-lg rounded-lg bg-white '
                    )}
                    ref={modalRef}
                >
                    {header && (
                        <div
                            className={cn(
                                'py-4 px-6 rounded-t-xl border-b border-black/5 flex flex-row items-center justify-between font-bold text-xl text-black ',
                                headerClassname
                            )}
                        >
                            <p>{header}</p>
                            <button className=" p-0 bg-white" onClick={onClose}>
                                <AiOutlineClose className="text-black w-5 h-5 " />
                            </button>
                        </div>
                    )}
                    <div className="h-[550px] p-6 overflow-y-scroll">
                        {children}
                    </div>
                    {footer && (
                        <div
                            className={cn(
                                'flex flex-row items-center justify-end rounded-b-lg border-t border-black/5'
                            )}
                        >
                            <div className="w-full px-6 py-4">{footer}</div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default Modal;
