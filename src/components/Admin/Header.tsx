import { AiOutlineLogout } from 'react-icons/ai';

import React from 'react';

type Props = {};

const Header = (props: Props) => {
    return (
        <div className="w-full h-16 bg-white rounded-lg flex flex-row items-center px-4">
            <div className="flex flex-row items-center gap-4 ml-auto">
                <p className="text-right">Hi admin !</p>
                <div className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer">
                    <AiOutlineLogout className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
};

export default Header;
