'use client';
import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineBarChart } from 'react-icons/ai';
import {
    RiProductHuntLine,
    RiBillLine,
    RiAccountCircleLine,
} from 'react-icons/ri';
import { TbBrandBlogger } from 'react-icons/tb';
import { TSidebarLink } from '@/types/general';

const SIDEBAR_LINK: TSidebarLink[] = [
    {
        id: 1,
        name: 'Thống kê',
        link: '/dashboard',
        icon: <AiOutlineBarChart className="w-6 h-6" />,
    },
    {
        id: 2,
        name: 'Sản phẩm',
        link: '/dashboard/products',
        icon: <RiProductHuntLine className="w-6 h-6" />,
    },
    {
        id: 4,
        name: 'Danh mục',
        link: '/dashboard/categories',
        icon: <BiCategory className="w-6 h-6" />,
    },
    {
        id: 5,
        name: 'Thương hiệu',
        link: '/dashboard/brands',
        icon: <TbBrandBlogger className="w-6 h-6" />,
    },
    {
        id: 6,
        name: 'Đơn hàng',
        link: '/dashboard/orders',
        icon: <RiBillLine className="w-6 h-6" />,
    },
    {
        id: 7,
        name: 'Tài khoản',
        link: '/dashboard/accounts',
        icon: <RiAccountCircleLine className="w-6 h-6" />,
    },
];

type Props = {};

const Sidebar = (props: Props) => {
    const pathName = usePathname();

    return (
        <div className="h-screen p-6 flex flex-col text-black gap-6 shadow-lg">
            <p className="hidden sm:block text-2xl font-bold text-center">
                Admin Dashboard
            </p>
            <div className="flex flex-col gap-2">
                {SIDEBAR_LINK.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        className={cn(
                            'block sm:flex flex-row items-center gap-4 px-6 py-4 rounded-xl text-sm text-black',
                            pathName === item.link
                                ? 'bg-primary text-white shadow-lg'
                                : ' hover:bg-primary/20'
                        )}
                    >
                        {item.icon}
                        <p className="hidden sm:block text-md font-medium">
                            {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
