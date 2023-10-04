import React, { useRef } from 'react';
import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './Button';
import Spinner from './Spinner';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOk?: () => void;
    header?: String | React.ReactNode;
    headerClassname?: string;
    contentContainerClassname?: string;
    footer?: React.ReactNode;
    containerClassname?: string;
    loadingSubmit?: boolean;
    showCloseIcon?: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
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
    loadingSubmit,
    containerClassname,
    showCloseIcon = true,
    showFooter = true,
    showHeader = true,
}: Props) => {
    return (
        isOpen && (
            <div
                className={cn(
                    'fixed inset-0 z-[100] flex flex-row items-center justify-center bg-black/50 px-4 '
                )}
                onClick={(e) => {
                    onClose();
                }}
            >
                <div
                    className={cn(
                        'w-full max-w-[700px] shadow-lg rounded-lg bg-white ',
                        containerClassname
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {header && showHeader && (
                        <div
                            className={cn(
                                'py-4 px-6 rounded-t-xl border-b border-black/5 flex flex-row items-center justify-between font-bold text-xl text-black ',
                                headerClassname
                            )}
                        >
                            <p>{header}</p>
                            {showCloseIcon && (
                                <button
                                    className=" p-0 bg-white"
                                    onClick={onClose}
                                >
                                    <AiOutlineClose className="text-black w-5 h-5 " />
                                </button>
                            )}
                        </div>
                    )}
                    <div
                        className={cn(
                            'max-h-[500px] p-6 overflow-y-auto no-scrollbar',
                            contentContainerClassname
                        )}
                    >
                        {children}
                    </div>
                    {showFooter && (
                        <div
                            className={cn(
                                'flex flex-row items-center justify-end rounded-b-lg border-t border-black/5'
                            )}
                        >
                            <div className="w-full px-6 py-4">
                                {loadingSubmit ? (
                                    <div className="py-2">
                                        <Spinner />
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            'flex flex-row justify-end space-x-2'
                                        }
                                    >
                                        <Button
                                            className="min-w-[110px] !bg-red-600 text-white"
                                            size="sm"
                                            onClick={onClose}
                                            disabled={loadingSubmit}
                                        >
                                            <p className="text-sm font-medium">
                                                Hủy
                                            </p>
                                        </Button>
                                        <Button
                                            className="min-w-[110px] !bg-green-600 text-white"
                                            size="sm"
                                            onClick={onOk}
                                            disabled={loadingSubmit}
                                        >
                                            <p className="text-sm font-medium">
                                                Đồng ý
                                            </p>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default Modal;
