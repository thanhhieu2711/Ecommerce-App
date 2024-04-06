import { useDrawer } from '@/hooks/store';
import { useAppDispatch } from '@/stores';
import { openWishlistDrawer } from '@/stores/reducers/drawer';
import { toggleAddToWishlist } from '@/stores/reducers/wishlist';
import { TProductInfo } from '@/types/general';
import { capacityList, colorList } from '@/utils/constants/general';
import {
    formatCurrency,
    getInitialColorAndCapacity,
    priceCalculator,
} from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { FaHeartCrack } from 'react-icons/fa6';

type Props = {
    item: TProductInfo;
};

const WishlistItem = ({ item }: Props) => {
    const dispatch = useAppDispatch();
    const { color, capacity } = getInitialColorAndCapacity({ product: item });

    return (
        <div className="cursor-pointer w-full flex flex-row gap-2 items-center p-2 hover:bg-primary/5 rounded-lg">
            <Link
                href={`/products/${item.slug}-${item.id}`}
                className="w-full flex flex-row items-center gap-2"
                onClick={() => {
                    dispatch(openWishlistDrawer(false));
                }}
            >
                <Image
                    src={item.images[0]}
                    width={70}
                    height={70}
                    objectFit="cover"
                    objectPosition="center"
                    alt=""
                    loading="lazy"
                />
                <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium line-clamp-2">
                        {item.name}
                    </p>
                    <div className="flex flex-row items-center gap-2">
                        <p className="font-bold text-red-600">
                            {formatCurrency(
                                priceCalculator({
                                    value: item.price,
                                    extraPrice:
                                        (color.extraPrice || 0) +
                                        (capacity.extraPrice || 0),
                                    discount: item.discount,
                                })
                            )}
                        </p>
                        <p className="text-sm text-black/50 line-through">
                            {formatCurrency(
                                priceCalculator({
                                    value: item.price,
                                    extraPrice:
                                        (color.extraPrice || 0) +
                                        (capacity.extraPrice || 0),
                                })
                            )}
                        </p>
                    </div>
                </div>
            </Link>
            <div
                className="hover:bg-red-600 p-2 border border-black/5 hover:!border-transparent rounded-full text-black/50 cursor-pointer ml-[2px] group"
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleAddToWishlist(item));
                }}
            >
                <BiTrash className="!w-4 !h-4 xs:!w-4 xs:!h-4 text-black/50 group-hover:!text-white " />
            </div>
        </div>
    );
};

export default WishlistItem;
