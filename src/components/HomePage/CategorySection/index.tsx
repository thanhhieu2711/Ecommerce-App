import { TCategoryInfo } from '@/types/general';
import Image from 'next/image';
import React from 'react';

type Props = {
    categories: TCategoryInfo[];
};

const CategorySection = ({ categories }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-6 ">
            <p className="text-xl font-semibold sm:text-2xl uppercase">
                Danh mục nổi bật
            </p>
            <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {categories?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="col-span-1 flex flex-col gap-3 hover:bg-secondary rounded-lg py-2 px-1 hover:cursor-pointer h-fit"
                        >
                            <div className="aspect-w-2 aspect-h-1 sm:aspect-w-2 sm:aspect-h-1">
                                <Image
                                    src={item?.thumbnail}
                                    alt="error-img"
                                    fill
                                    objectFit="contain"
                                    // objectPosition="center"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-center font-semibold">
                                {item.name}
                            </p>
                            {!!item?.product?.length && (
                                <p className="text-center text-xs text-black/50 -mt-1">
                                    {`${item?.product?.length} sản phẩm`}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySection;
