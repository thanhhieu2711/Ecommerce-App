/* eslint-disable @next/next/no-img-element */
import { TProductInfo } from '@/types/general';
import cn from 'classnames';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import Image from 'next/image';
import { useWishlist } from '@/hooks/store';
import { useAppDispatch } from '@/stores';
import { toggleAddToWishlist } from '@/stores/reducers/wishlist';
import { Tooltip } from 'antd';

type Props = {
    product: TProductInfo;
    activeImage: string;
    handleChangeActiveImage: (image: string) => void;
};

export const ProductImage = ({
    product,
    activeImage,
    handleChangeActiveImage,
}: Props) => {
    const dispatch = useAppDispatch();
    const { checkExist } = useWishlist();
    return (
        <div className="flex flex-col gap-2 h-fit">
            <div className="flex-1 flex flex-row items-center justify-center rounded-lg border border-black/10 md:max-h-[450px] relative">
                <img
                    src={activeImage}
                    className="object-contain w-full h-[50%] md:h-[95%] rounded-lg"
                    alt="product-img"
                    loading="lazy"
                />
                <div
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => dispatch(toggleAddToWishlist(product))}
                >
                    {checkExist(product.id) ? (
                        <Tooltip title="Bỏ thích">
                            <FaHeart className="icon-base !text-red-600 hover:opacity-70" />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Yêu thích">
                            <FaRegHeart className="icon-base text-red-600 hover:opacity-70" />
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="flex flex-row gap-2 sm:mb-3 sm:gap-3 !max-h-fit w-full">
                {product.images.map((image) => (
                    <div
                        key={image}
                        className={cn(
                            'flex-1 h-fit cursor-pointer border border-black/10 rounded-lg ',
                            image === activeImage && 'border-primary '
                        )}
                        onClick={() => handleChangeActiveImage(image)}
                    >
                        <Image
                            width={100}
                            height={100}
                            src={image}
                            loading="lazy"
                            objectPosition="center"
                            objectFit="contain"
                            alt="product-image"
                            className="p-1 rounded-lg w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImage;
