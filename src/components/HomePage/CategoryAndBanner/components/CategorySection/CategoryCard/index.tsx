import { TCategoryInfo } from '@/types/general';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
    category: TCategoryInfo;
};

const CategoryCard = ({ category }: Props) => {
    const router = useRouter();
    return (
        <div
            className="col-span-1 flex flex-col gap-3 hover:bg-secondary rounded-lg py-2 px-1 hover:cursor-pointer h-fit"
            onClick={() => {
                router.push(`/products?categoryId=${category.id}`);
            }}
        >
            <div className="aspect-w-2 aspect-h-1 sm:aspect-w-2 sm:aspect-h-1">
                <Image
                    src={category?.thumbnail}
                    alt="error-img"
                    fill
                    objectFit="contain"
                    objectPosition="center"
                    loading="lazy"
                    quality={50}
                />
            </div>
            <p className="text-center text-xs sm:text-sm font-medium">
                {category.name}
            </p>
            {!!category?.product?.length && (
                <p className="text-center text-[10px] sm:text-xs text-black/50 -mt-1">
                    {`${category?.product?.length} sản phẩm`}
                </p>
            )}
        </div>
    );
};

export default CategoryCard;
