import React from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/utils/helper';
import { TProductInfo } from '@/types/general';
import Link from 'next/link';
type Props = {
    product: TProductInfo;
};

const SearchResultItem = ({ product }: Props) => {
    return (
        <Link
            href={''}
            className="flex flex-row items-center gap-2 hover:bg-secondary-variant-1 p-2 rounded-md"
        >
            <Image
                width={50}
                height={50}
                src={product.images[0]}
                alt="pdt-img"
            />
            <div className="text-sm">
                <p className=" font-bold line-clamp-2">{product.name}</p>
                <span className="font-bold text-red-600">
                    {formatCurrency(
                        product.price - product.price * product.discount
                    )}
                </span>{' '}
                <span className="text-xs text-black/50 line-through">
                    {formatCurrency(product.price)}
                </span>
            </div>
        </Link>
    );
};

export default SearchResultItem;
