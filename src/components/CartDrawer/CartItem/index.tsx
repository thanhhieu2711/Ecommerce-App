import Image from 'next/image';
import Counter from '@/components/Common/Counter';
import { BiTrash } from 'react-icons/bi';
import { TCartItem } from '@/types/general';
import { formatCurrency } from '@/utils/helper';
import { useAppDispatch } from '@/stores';
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from '@/stores/reducers/cart';
import Link from 'next/link';

type Props = {
    item: TCartItem;
    index: number;
};

const CartItem = ({ item, index }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <Link href={`/products/${item.product.slug}-${item.product.id}`}>
            <div className="w-full flex flex-row  gap-2 items-center p-2 hover:bg-secondary-variant-3 rounded-lg">
                {/* <div className=" border border-black/5 rounded-lg"> */}
                <Image
                    src={item.product.images[0]}
                    width={70}
                    height={70}
                    objectFit="cover"
                    objectPosition="center"
                    loading="lazy"
                    alt="error-image"
                />
                {/* </div> */}
                <div className="flex flex-1 flex-col gap-1">
                    <div className=" flex flex-row justify-between items-center">
                        <p className="text-sm font-medium line-clamp-2">
                            {item.product.name}
                        </p>
                        <div
                            className="hover:bg-secondary-variant-1/50 border border-black/10 hover:!border-transparent w-fit h-fit p-2 rounded-full text-black/50 hover:text-red-600 cursor-pointer ml-[2px]"
                            onClick={() => {
                                dispatch(removeFromCart({ index: index }));
                            }}
                        >
                            <BiTrash className="!w-3 !h-3 xs:!w-4 xs:!h-4" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2 text-xs text-black/50 flex-wrap">
                        {item.color?.name && (
                            <span>{`Màu sắc : ${item.color.name}`}</span>
                        )}
                        {item.capacity && (
                            <>
                                <span className="text-[10px]">|</span>
                                <span>{`Dung lượng : ${item.capacity.name}`}</span>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row justify-between items-center mt-2">
                        <Counter
                            defaultValue={item.quantity}
                            handleDecrease={() =>
                                dispatch(decreaseQuantity({ index: index }))
                            }
                            handleIncrease={() =>
                                dispatch(increaseQuantity({ index: index }))
                            }
                            onChange={() => {}}
                            minValue={0}
                            isDisableInput={true}
                            buttonClassname="!w-6 !h-6 bg-secondary-variant-1/50 !rounded-full !text-black/50"
                            inputClassname="!max-h-6 !w-8 !m-0 !p-0 border-none text-sm font-medium !bg-opacity-0"
                            className="!gap-px"
                        />
                        <p className="text-sm font-bold text-secondary-variant-2 ">
                            {formatCurrency(item.price)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CartItem;
