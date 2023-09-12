'use client';
import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import path from 'path';
type Props = {};

export type TSidebarLink = {
    id: number;
    name: string;
    link: string;
    icon?: React.ReactNode;
};

export const SIDEBAR_LINK: TSidebarLink[] = [
    {
        id: 1,
        name: 'Thống kê',
        link: '/dashboard/revenue',
        icon: <BiSearch className="w-6 h-6" />,
    },
    {
        id: 2,
        name: 'Sản phẩm',
        link: '/dashboard/products',
        icon: <BiSearch className="w-6 h-6" />,
    },
    {
        id: 4,
        name: 'Danh mục',
        link: '/dashboard/caterogies',
        icon: <BiSearch className="w-6 h-6" />,
    },
    {
        id: 5,
        name: 'Thương hiệu',
        link: '/dashboard/brands',
        icon: <BiSearch className="w-6 h-6" />,
    },
    {
        id: 5,
        name: 'Đơn hàng',
        link: '/dashboard/orders',
        icon: <BiSearch className="w-6 h-6" />,
    },
    {
        id: 6,
        name: 'Tài khoản',
        link: '/dashboard/accounts',
        icon: <BiSearch className="w-6 h-6" />,
    },
];

const Sidebar = (props: Props) => {
    const pathName = usePathname();

    const isActiveLink = useCallback(
        (link: string) => {
            return pathName?.includes(link);
        },
        [pathName]
    );

    return (
        <div className="min-h-[100vh] p-6 flex flex-col text-black gap-4">
            <p className="text-2xl font-bold text-center">Admin Dashboard</p>
            <div className="flex flex-col gap-2">
                {SIDEBAR_LINK.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        className={cn(
                            'flex flex-row items-center gap-4 px-6 py-4 hover:bg-primary/50 rounded-xl text-sm text-black',
                            isActiveLink(item.link) && 'bg-primary text-white'
                        )}
                    >
                        <BiSearch className="w-5 h-5" />
                        <p className="text-md font-medium">{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
