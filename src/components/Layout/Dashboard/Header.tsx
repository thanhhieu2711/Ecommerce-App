'use client';
import { AiOutlineLogout } from 'react-icons/ai';
import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {};

const Header = (props: Props) => {
    const router = useRouter();
    return (
        <div className="w-full h-16 bg-white rounded-lg flex flex-row items-center px-4">
            <div className="flex flex-row items-center gap-4 ml-auto">
                <p className="text-right">Hi admin !</p>
                <button
                    className="p-2 bg-neutral-200 rounded-full cursor-pointer"
                    onClick={() => router.push('/')}
                >
                    <AiOutlineLogout className="w-5 h-5 text-black" />
                </button>
            </div>
        </div>
    );
};

export default Header;
