import cn from 'classnames';
import Image from 'next/image';
import Counter from '@/components/Common/Counter';
import { formatCurrency, priceCalculator } from '@/utils/helper';
import { TCartItem } from '@/types/general';
import { useAppDispatch } from '@/stores';
import { decreaseQuantity, increaseQuantity } from '@/stores/reducers/cart';

type TCheckouItem = {
    item: TCartItem;
    index: number;
};

export const CheckoutItem = ({ item, index }: TCheckouItem) => {
    const dispatch = useAppDispatch();
    return (
        <div className={cn('flex items-center px-4')}>
            <div className="w-2/5 flex items-center justify-center gap-4">
                <Image
                    width={70}
                    height={70}
                    objectFit="cover"
                    src={item.product.images[0]}
                    loading="lazy"
                    alt="product-img"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    {item.color && (
                        <p className="text-xs font-medium text-black/50">
                            Màu sắc : {item.color.name}
                        </p>
                    )}
                    {item.capacity && (
                        <p className="text-xs font-medium text-black/50">
                            Dung lượng : {item.capacity.name}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex-1 flex items-center gap-2 ">
                <div className=" flex-1 flex justify-center">
                    <Counter
                        defaultValue={item.quantity}
                        handleDecrease={() =>
                            dispatch(
                                decreaseQuantity({
                                    index: index,
                                })
                            )
                        }
                        handleIncrease={() =>
                            dispatch(
                                increaseQuantity({
                                    index: index,
                                })
                            )
                        }
                        onChange={() => {}}
                        minValue={0}
                        isDisableInput={true}
                        buttonClassname="!w-8 !h-8 bg-secondary-variant-1/50 !rounded-full !text-black/50"
                        inputClassname="!max-h-6 !w-8 !m-0 !p-0 border-none text-sm font-medium !bg-opacity-0"
                        className="!gap-px"
                    />
                </div>
                <div className=" flex-1 flex justify-center font-medium ">
                    {formatCurrency(
                        priceCalculator({
                            value: item.product.price,
                            // discount: item.product.discount,
                            extraPrice:
                                item.capacity?.extraPrice +
                                item.color?.extraPrice,
                        })
                    )}
                </div>
                <div className=" flex-1 flex justify-center font-semibold text-secondary-variant-2 ">
                    {formatCurrency(item.price)}
                </div>
            </div>
        </div>
    );
};
export default CheckoutItem;
