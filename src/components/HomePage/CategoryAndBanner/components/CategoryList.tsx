import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TCategoryInfo } from '@/types/general';
import Link from 'next/link';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { PiLaptop } from 'react-icons/pi';
import { TfiTablet } from 'react-icons/tfi';
import { BsSmartwatch } from 'react-icons/bs';
import { SlScreenDesktop } from 'react-icons/sl';
import { FaComputer } from 'react-icons/fa6';
import { BsKeyboard } from 'react-icons/bs';
import { PiTelevisionSimple, PiHeadphonesBold } from 'react-icons/pi';

type Props = {};

const CategoryList = () => {
    const [categories, setCategories] = useState<TCategoryInfo[]>([]);
    const getCategories = async () => {
        const { data } = await axios.get('/api/categories');
        data.isSuccess && setCategories(data.data);
    };

    const _renderIcon = (name: string) => {
        switch (name) {
            case 'Điện thoại': {
                return <HiOutlineDevicePhoneMobile className="icon-base" />;
            }
            case 'Laptop': {
                return <PiLaptop className="icon-base" />;
            }
            case 'Máy tính bảng': {
                return <TfiTablet className="icon-base" />;
            }
            case 'Đồng hồ thông minh': {
                return <BsSmartwatch className="icon-base" />;
            }
            case 'Màn hình': {
                return <SlScreenDesktop className="icon-base" />;
            }
            case 'Linh kiện - PC': {
                return <FaComputer className="icon-base" />;
            }
            case 'Bàn phím': {
                return <BsKeyboard className="icon-base" />;
            }
            case 'Tai nghe': {
                return <PiHeadphonesBold className="icon-base" />;
            }
            case 'Tivi': {
                return <PiTelevisionSimple className="icon-base" />;
            }
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="hidden h-full md:col-span-1 md:block rounded-lg border border-black/5 shadow-card bg-white">
            <div className="w-full h-full flex flex-col">
                {categories.map((category) => {
                    return (
                        <Link
                            key={category.id}
                            href={`/category/${category.id}`}
                            className="first:rounded-t-lg last:rounded-b-lg  flex-1 flex flex-row gap-4 items-center px-3 py-1 text-black/80 hover:text-white hover:bg-primary"
                        >
                            {_renderIcon(category.name)}
                            <p className="text-sm font-semibold line-clamp-1">
                                {category.name}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
