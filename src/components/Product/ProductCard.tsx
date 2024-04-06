import React from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { Rate } from 'antd';
import { TProductInfo } from '@/types/general';
import {
    formatCurrency,
    getInitialColorAndCapacity,
    priceCalculator,
} from '@/utils/helper';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/hooks/store';
import { useAppDispatch } from '@/stores';
import { toggleAddToWishlist } from '@/stores/reducers/wishlist';
type Props = {
    product: TProductInfo;
};

const ProductCard = ({ product }: Props) => {
    const dispatch = useAppDispatch();

    const { color, capacity } = getInitialColorAndCapacity({ product });

    const { checkExist } = useWishlist();

    return (
        <Link
            href={`/products/${product.slug}-${product.id}`}
            className="w-full h-fit flex flex-col gap-2 sm:gap-4 rounded-xl bg-white shadow-product-card p-2 relative"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="aspect-w-3 aspect-h-3">
                <Image
                    src={product?.images[0]}
                    alt="error-image"
                    objectFit="contain"
                    fill
                    objectPosition="center"
                    loading="lazy"
                />
            </div>
            <p className="text-sm sm:text-md font-semibold line-clamp-2 xl:min-h-[48px]">
                {product.name}
            </p>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <p className="text-red-600 font-bold ">
                    {formatCurrency(
                        priceCalculator({
                            value: product.price,
                            extraPrice: color.extraPrice + capacity.extraPrice,
                            discount: product.discount,
                        })
                    )}
                </p>
                <p className="line-through text-black/50 text-sm">
                    {formatCurrency(
                        priceCalculator({
                            value: product.price,
                            extraPrice: color.extraPrice + capacity.extraPrice,
                        })
                    )}
                </p>
            </div>
            <div className="flex items-center justify-between flex-wrap-reverse gap-1 sm:gap-2 ">
                <Rate
                    defaultValue={product.ratting}
                    disabled
                    className="text-[13px] sm:text-sm text-common-warning"
                />
                <div
                    className="flex items-center gap-1"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(toggleAddToWishlist(product));
                    }}
                >
                    <p className="hidden md:block text-xs text-black/50">
                        Yêu thích
                    </p>

                    {checkExist(product.id) ? (
                        <BiSolidHeart className="!w-6 !h-6 !text-red-600 cursor-pointer" />
                    ) : (
                        <BiHeart className="!w-6 !h-6 !text-red-600 cursor-pointer" />
                    )}
                </div>
            </div>
            <div className="absolute top-0 -left-1 w-20 h-7 bg-red-600 rounded-r-xl after:absolute after:w-1 after:h-1 after:rounded-b-xl after:bg-red-800 after:-bottom-1">
                <div className="w-full h-full grid place-items-center">
                    <p className="text-xs font-medium text-white ">{`Giảm ${
                        product.discount * 100
                    }%`}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
