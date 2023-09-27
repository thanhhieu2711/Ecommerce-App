import { TProductInfo } from '@/types/general';
import cn from 'classnames';
import { FaRegHeart } from 'react-icons/fa6';
import Image from 'next/image';

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
    return (
        <div className="col-span-4 md:col-span-2 ">
            <div className="flex flex-col gap-2 h-full  ">
                <div className="flex-1 flex rounded-lg border border-black/10 md:max-h-[450px] relative">
                    <img
                        src={activeImage}
                        className="object-contain w-full h-full rounded-lg"
                        alt="product-img"
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3 cursor-pointer">
                        <FaRegHeart className="!w-5 !h-5 hover:text-red-600" />
                    </div>
                </div>
                <div className="flex flex-row gap-2  sm:mb-3 sm:gap-3 h-full w-full">
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
        </div>
    );
};

export default ProductImage;
