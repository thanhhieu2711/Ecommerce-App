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
    header?: React.ReactNode;
    headerClassname?: string;
    contentContainerClassname?: string;
    footer?: React.ReactNode;
    containerClassname?: string;
    loadingSubmit?: boolean;
    showCloseIcon?: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
};

export const Drawer = ({
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
}: // showCloseIcon = true,
Props) => {
    return (
        <div
            className={cn(
                'bg-transparent',
                isOpen &&
                    'fixed transition-all duration-500 ease-out inset-0 bg-black/20'
            )}
            onClick={() => onClose()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    'fixed top-0 right-0 w-4/5 sm:w-96 md:w-96 bg-white h-screen transition-all duration-200 ease-in translate-x-full',
                    isOpen && '!translate-x-0'
                )}
            >
                <div className="w-full h-full flex flex-col">
                    <div className="flex flex-row items-center justify-between border-b border-black/5 p-4">
                        {header}

                        <div
                            className="p-1 rounded-full hover:bg-neutral-200 cursor-pointer text-black"
                            onClick={() => onClose()}
                        >
                            <AiOutlineClose className="icon-base !w-5 !h-5" />
                        </div>
                    </div>
                    <div className="w-full h-full p-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
