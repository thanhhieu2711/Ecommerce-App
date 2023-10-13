import cn from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    header?: React.ReactNode;
    headerClassname?: string;
    contentContainerClassname?: string;
    footer?: React.ReactNode;
    containerClassname?: string;
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
    headerClassname,
    contentContainerClassname,
    containerClassname,
    showCloseIcon = true,
    closeIconClassname,
}: Props) => {
    return (
        <div
            className={cn(
                'bg-transparent z-[150] h-full',
                isOpen &&
                    'fixed transition-all duration-500 ease-out inset-0 !bg-black/50 '
            )}
            onClick={() => onClose()}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={cn(
                    'fixed top-0 right-0 bottom-0 w-full xs:w-96 bg-white h-screen transition-all duration-300 ease-out translate-x-full z-50',
                    isOpen && '!translate-x-0'
                )}
            >
                <div
                    className={cn(
                        'w-full h-full flex flex-col',
                        containerClassname
                    )}
                >
                    <div
                        className={cn(
                            'flex flex-row items-center justify-between border-b border-black/5 p-4 bg-primary text-white',
                            headerClassname
                        )}
                    >
                        {header}

                        {showCloseIcon && (
                            <div
                                className={cn(
                                    'p-1 cursor-pointer text-white rounded-full hover:bg-white hover:text-primary ',
                                    closeIconClassname
                                )}
                                onClick={() => onClose()}
                            >
                                <AiOutlineClose className="!w-5 !h-5" />
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            'w-full flex-1 p-3 overflow-y-auto no-scrollbar',
                            contentContainerClassname
                        )}
                    >
                        {children}
                    </div>
                    {footer && (
                        <div className="w-full p-4 border-t border-black/5 mt-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Drawer;
