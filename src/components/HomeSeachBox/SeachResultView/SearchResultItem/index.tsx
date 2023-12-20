import React from 'react';
import Image from 'next/image';
import {
    formatCurrency,
    getInitialColorAndCapacity,
    priceCalculator,
} from '@/utils/helper';
import { TProductInfo } from '@/types/general';
import Link from 'next/link';
import { useAppDispatch } from '@/stores';
import { openHomeSearchBoxModal } from '@/stores/reducers/modal';
type Props = {
    product: TProductInfo;
};

const SearchResultItem = ({ product }: Props) => {
    const { color, capacity } = getInitialColorAndCapacity({ product });
    const dispatch = useAppDispatch();
    return (
        <Link
            href={`/products/${product.slug}-${product.id}`}
            className="flex flex-row items-center gap-2 hover:bg-secondary-variant-3 p-2 rounded-md"
            onClick={() => {
                dispatch(openHomeSearchBoxModal(false));
            }}
        >
            <Image
                width={60}
                height={60}
                src={product.images[0]}
                alt="pdt-img"
                loading="lazy"
            />
            <div className="text-sm">
                <p className=" font-bold line-clamp-2">{product.name}</p>
                <span className="font-bold text-red-600">
                    {formatCurrency(
                        priceCalculator({
                            value: product.price,
                            extraPrice: color.extraPrice + capacity.extraPrice,
                            discount: product.discount,
                        })
                    )}
                </span>{' '}
                <span className="text-xs text-black/50 line-through">
                    {formatCurrency(
                        priceCalculator({
                            value: product.price,
                            extraPrice: color.extraPrice + capacity.extraPrice,
                        })
                    )}
                </span>
            </div>
        </Link>
    );
};

export default SearchResultItem;
