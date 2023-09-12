'use client';
import React, { useCallback } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { SIDEBAR_LINK } from '@/utils/constants/general';
import toast from 'react-hot-toast';
type Props = {};

const Sidebar = (props: Props) => {
    const pathName = usePathname();

    return (
        <div className="min-h-[100vh] p-6 flex flex-col text-black gap-6 shadow-lg">
            <p className="text-2xl font-bold text-center">Admin Dashboard</p>
            <div className="flex flex-col gap-2">
                {SIDEBAR_LINK.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        className={cn(
                            'flex flex-row items-center gap-4 px-6 py-4 rounded-xl text-sm text-black',
                            pathName === item.link
                                ? 'bg-primary text-white shadow-lg'
                                : ' hover:bg-primary/20'
                        )}
                    >
                        {item.icon}
                        <p className="text-md font-medium">{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
