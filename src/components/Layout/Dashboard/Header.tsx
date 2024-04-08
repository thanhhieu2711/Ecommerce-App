'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Link from 'next/link';

type Props = {};

const Header = (props: Props) => {
    const router = useRouter();
    return (
        <div className="w-full h-16 flex flex-row justify-between items-center px-4 py-2 bg-white">
            <p className="font-medium text-lg text-black/70">Xin chào!</p>
            <Link href={'/'} className="flex items-center gap-2 text-primary">
                <p>Trở về trang chủ</p>
                <RiArrowGoBackLine className="w-5 h-5" />
            </Link>
        </div>
    );
};

export default Header;
