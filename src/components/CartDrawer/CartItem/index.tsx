import cn from 'classnames';
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
import toast from 'react-hot-toast';

type Props = {
    item: TCartItem;
    index: number;
};

const CartItem = ({ item, index }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <div className="w-full flex flex-row  gap-2 items-center p-2">
            {/* <div className=" border border-black/5 rounded-lg"> */}
            <Image
                src={item.product.images[0]}
                width={60}
                height={60}
                objectFit="cover"
                objectPosition="center"
                alt=""
            />
            {/* </div> */}
            <div className="flex flex-1 flex-col">
                <div className=" flex flex-row justify-between">
                    <p className="text-sm font-medium line-clamp-1">
                        {item.product.name}
                    </p>
                    <div
                        className="bg-secondary-variant-1/50 p-1 rounded-full text-black/50 hover:text-black cursor-pointer ml-[2px]"
                        onClick={() => {
                            dispatch(removeFromCart({ index: index }));
                            toast.success('Đã xóa khỏi giỏ hàng!');
                        }}
                    >
                        <BiTrash className="!w-3 !h-3 xs:!w-4 xs:!h-4" />
                    </div>
                </div>
                <div className="flex flex-col xs:flex-row xs:items-center mt-1 xs:mt-0 xs:gap-2 text-xs text-black/50 flex-wrap">
                    <span>{`Màu sắc : ${item.color.name}`}</span>
                    <span className="hidden xs:inline-block ">|</span>
                    <span>{`Dung lượng : ${item.capacity.name}`}</span>
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
                        buttonClassname="!w-5 !h-5 bg-secondary-variant-1/50 !rounded-full !text-black/50"
                        inputClassname="!max-h-6 !w-8 !m-0 !p-0 border-none text-sm"
                        className="!gap-px"
                    />
                    <p className="text-sm font-bold text-secondary-variant-2 ">
                        {formatCurrency(item.price)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
