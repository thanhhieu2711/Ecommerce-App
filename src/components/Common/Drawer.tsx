import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

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
    closeIconClassname?: string;
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
    showCloseIcon = true,
    closeIconClassname,
}: Props) => {
    return (
        <div
            className={cn(
                'bg-transparent z-[150] h-full',
                isOpen &&
                    'fixed transition-all duration-500 ease-out inset-0 !bg-black/20 '
            )}
            onClick={() => onClose()}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={cn(
                    'fixed top-0 right-0 bottom-0 w-full sm:w-96 md:w-96 bg-white h-screen transition-all duration-300 ease-out translate-x-full z-50',
                    isOpen && '!translate-x-0'
                )}
            >
                <div className="w-full h-full flex flex-col">
                    <div
                        className={cn(
                            'flex flex-row items-center justify-between border-b border-black/5 p-4',
                            headerClassname
                        )}
                    >
                        {header}

                        <div
                            className={cn(
                                'p-1 cursor-pointer text-black',
                                closeIconClassname
                            )}
                            onClick={() => onClose()}
                        >
                            <AiOutlineClose className="!w-5 !h-5" />
                        </div>
                    </div>
                    <div className="w-full flex-1 p-3 overflow-y-auto no-scrollbar">
                        {children}
                    </div>
                    {footer && (
                        <div className="w-full p-4 border-t border-black/5">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Drawer;
