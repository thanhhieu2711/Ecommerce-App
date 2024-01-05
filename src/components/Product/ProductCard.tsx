import { Tooltip } from 'antd';
import React from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { Rate } from 'antd';
import { TProductInfo } from '@/types/general';
import { formatCurrency, priceCalculator } from '@/utils/helper';
import Link from 'next/link';
type Props = {
    product: TProductInfo;
};

const ProductCard = ({ product }: Props) => {
    return (
        <Link
            href={`/products/${product.slug}-${product.id}`}
            className="w-full flex flex-col  gap-2 sm:gap-4 rounded-xl bg-white shadow-md p-2"
        >
            <div
                className="aspect-w-3 aspect-h-3 "
                style={{
                    background: `url(${product?.images[0]}) no-repeat center/100%`,
                    backgroundSize: '80%',
                }}
            ></div>
            <p className="font-semibold line-clamp-2">{product.name}</p>
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap ">
                <p className="text-red-600 font-bold ">
                    {formatCurrency(product.price)}
                </p>
                <p className="line-through text-black/50 text-sm">
                    {formatCurrency(
                        priceCalculator({
                            value: product.price,
                            extraPrice: product.discount,
                        })
                    )}
                </p>
            </div>
            <div className="flex items-center justify-between flex-wrap-reverse gap-1 sm:gap-2">
                <Rate
                    defaultValue={5}
                    disabled
                    className="text-sm text-common-warning"
                />
                <div className="flex items-center gap-1">
                    <p className="text-xs text-black/50">Yêu thích</p>
                    <Tooltip title="Thích">
                        <BiHeart className="!w-5 !h-5 !text-red-600 cursor-pointer" />
                    </Tooltip>
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
