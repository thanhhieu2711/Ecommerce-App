import React, { useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '@/stores';
import { openLoginModal, openRegisterModal } from '@/stores/reducers/modal';
import { signOut, useSession } from 'next-auth/react';

import {
    BiUserCircle,
    BiLogOut,
    BiLogIn,
    BiShoppingBag,
    BiRegistered,
    BiHeart,
    BiUser,
    BiReceipt,
    BiSolidDashboard,
} from 'react-icons/bi';
import useClickOutside from '@/hooks/useClickOutside';
import { Button } from '../Common';
import Link from 'next/link';
import { openCartDrawer, openWishlistDrawer } from '@/stores/reducers/drawer';
import { ERole } from '@/types/user';
import { Session } from 'next-auth';
import toast from 'react-hot-toast';

type Props = {
    isContrast?: boolean;
};

const UserMenu = ({ isContrast }: Props) => {
    const dispatch = useAppDispatch();

    const { data, status } = useSession();

    const menuRef = useRef<HTMLDivElement>(null);

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const DEFAULT_OPTIONS: {
        id: number;
        title: string;
        link: string;
        icon: React.ReactNode;
        action?: () => void;
        className?: string;
    }[] = [
        {
            id: 1,
            title: 'Giỏ hàng',
            link: '',
            icon: <BiShoppingBag className="sm:hidden icon-base !w-5 !h-5" />,
            className: 'sm:hidden',
            action: () => dispatch(openCartDrawer(true)),
        },
        {
            id: 2,
            title: 'Yêu thích',
            link: '',
            icon: <BiHeart className="sm:hidden icon-base !w-5 !h-5" />,
            className: 'sm:hidden',
            action: () => dispatch(openWishlistDrawer(true)),
        },
        {
            id: 3,
            title: 'Đăng nhập',
            link: '',
            icon: <BiLogIn className="icon-base !w-5 !h-5" />,
            action: () => dispatch(openLoginModal(true)),
        },
        {
            id: 4,
            title: 'Đăng ký',
            link: '',
            icon: <BiRegistered className="icon-base !w-5 !h-5" />,
            action: () => dispatch(openRegisterModal(true)),
        },
    ];

    const USER_OPTIONS: {
        id: number;
        title: string;
        link: string;
        icon: React.ReactNode;
        action?: () => void;
        className?: string;
    }[] = [
        {
            id: 1,
            title: 'Thông tin cá nhân',
            link: '',
            icon: <BiUser className="icon-base !w-5 !h-5" />,
        },
        {
            id: 2,
            title: 'Đơn hàng của tôi',
            link: '',
            icon: <BiReceipt className="icon-base !w-5 !h-5" />,
        },
        {
            id: 3,
            title: 'Giỏ hàng',
            link: '',
            icon: <BiShoppingBag className="sm:hidden icon-base !w-5 !h-5" />,
            className: 'sm:hidden',
            action: () => dispatch(openCartDrawer(true)),
        },
        {
            id: 4,
            title: 'Yêu thích',
            link: '',
            icon: <BiHeart className="sm:hidden icon-base !w-5 !h-5" />,
            className: 'sm:hidden',
            action: () => dispatch(openWishlistDrawer(true)),
        },
        {
            id: 5,
            title: 'Đăng xuất',
            link: '',
            icon: <BiLogOut className="icon-base !w-5 !h-5" />,
            action: () => {
                signOut();
                toast.success('Bạn đã đăng xuất !');
            },
        },
    ];

    const ADMIN_OPTIONS: {
        id: number;
        title: string;
        link: string;
        icon: React.ReactNode;
        action?: () => void;
        className?: string;
    }[] = [
        {
            id: 1,
            title: 'Trang quản trị',
            link: '/dashboard',
            icon: <BiSolidDashboard className="icon-base" />,
            action: () => {},
            className: '',
        },
        {
            id: 2,
            title: 'Đăng xuất',
            link: '',
            icon: <BiLogOut className="icon-base !w-5 !h-5" />,
            action: signOut,
            className: 'border-t border-black/5',
        },
    ];

    const _renderMenuOption = useCallback(() => {
        if (status === 'unauthenticated') {
            return DEFAULT_OPTIONS.map((option, index) => (
                <Link
                    href={''}
                    key={option.id}
                    onClick={(e) => {
                        setOpenMenu(false);
                        option.action && option.action();
                    }}
                >
                    <div
                        className={cn(
                            'px-3 py-3 flex flex-row items-center gap-2 hover:bg-neutral-100 cursor-pointer',
                            option?.className,
                            {
                                'rounded-t-lg': index === 0,
                                'rounded-b-lg border-t border-black/5':
                                    index === USER_OPTIONS.length - 1,
                            }
                        )}
                    >
                        {option.icon}
                        <p className={cn('text-sm')}>{option.title}</p>
                    </div>
                </Link>
            ));
        }
        if (data?.user.role === ERole.ADMIN) {
            return ADMIN_OPTIONS.map((item, index) => (
                <Link
                    href={item.link}
                    key={item.id}
                    onClick={(e) => {
                        item.action && item.action();
                    }}
                >
                    <div
                        className={cn(
                            'px-3 py-3 flex flex-row items-center gap-2 hover:bg-neutral-100 cursor-pointer',
                            item?.className,
                            {
                                'rounded-t-lg': index === 0,
                                'rounded-b-lg border-t border-black/5':
                                    index === USER_OPTIONS.length - 1,
                            }
                        )}
                    >
                        {item.icon}
                        <p className={cn('text-sm')}>{item.title}</p>
                    </div>
                </Link>
            ));
        }
        return USER_OPTIONS.map((item, index) => (
            <Link
                href={''}
                key={item.id}
                onClick={(e) => {
                    item.action && item.action();
                }}
            >
                <div
                    className={cn(
                        'px-3 py-3 flex flex-row items-center gap-2 hover:bg-neutral-100 cursor-pointer',
                        item?.className,
                        {
                            'rounded-t-lg': index === 0,
                            'rounded-b-lg border-t border-black/5':
                                index === USER_OPTIONS.length - 1,
                        }
                    )}
                >
                    {item.icon}
                    <p className={cn('text-sm')}>{item.title}</p>
                </div>
            </Link>
        ));
    }, [status]);

    useClickOutside(menuRef, () => {
        setOpenMenu(false);
    });

    return (
        <div className="relative" ref={menuRef}>
            <Button
                variant="ghost"
                className={cn('!p-0 !m-0 flex !bg-transparent')}
                size="sm"
                onClick={() => setOpenMenu(!openMenu)}
            >
                <BiUserCircle className={cn('icon-base text-black')} />
            </Button>

            <div
                className={cn(
                    'hidden w-[200px] rounded-lg bg-white shadow-card top-9 right-0 opacity-0 transition-all duration-200 ease-out',
                    openMenu && '!block absolute !opacity-100'
                )}
            >
                {_renderMenuOption()}
            </div>
        </div>
    );
};

export default UserMenu;
