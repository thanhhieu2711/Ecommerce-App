import cn from 'classnames';
import Image from 'next/image';
import Counter from '@/components/Common/Counter';
import { formatCurrency, priceCalculator } from '@/utils/helper';
import { TCartItem } from '@/types/general';
import { useAppDispatch } from '@/stores';
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from '@/stores/reducers/cart';

type TCheckouItem = {
    item: TCartItem;
    index: number;
    showCounter?: boolean;
};

export const CheckoutItem = ({
    item,
    index,
    showCounter = true,
}: TCheckouItem) => {
    const dispatch = useAppDispatch();
    return (
        <div
            className={cn(
                'flex items-center p-2 flex-wrap gap-3 sm:gap-0 hover:bg-primary/5 rounded-md'
            )}
            onDoubleClick={() => dispatch(removeFromCart({ index: index }))}
        >
            <div
                className={cn(
                    'w-full sm:w-2/5  h-fit flex items-center gap-4',
                    !showCounter && 'sm:w-3/5'
                )}
            >
                <Image
                    width={80}
                    height={55}
                    objectFit="cover"
                    src={item.product.images[0]}
                    loading="lazy"
                    alt="product-img"
                />
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <div className="flex items-center gap-1">
                        {item?.color?.name && (
                            <span className="text-xs font-medium text-black/50 line-clamp-2">
                                {item.color.name}{' '}
                            </span>
                        )}
                        {item?.capacity?.name && (
                            <span className="text-xs font-medium text-black/50">
                                {' , '}
                                {item.capacity.name}
                            </span>
                        )}
                    </div>
                    <div className="flex sm:hidden flex-1 items-center justify-between gap-2 mt-2 ">
                        {showCounter ? (
                            <>
                                <div className="flex justify-center">
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
                                        buttonClassname="!w-7 !h-7 bg-secondary-variant-1/20 !rounded-full !text-black/50 !border-none hover:!bg-primary hover:!text-white"
                                        inputClassname="!max-h-6 !w-8 !m-0 !p-0 border-none text-sm font-medium !bg-opacity-0"
                                        className="!gap-px"
                                    />
                                </div>
                                <div className="hidden sm:flex justify-center font-medium ">
                                    {formatCurrency(
                                        priceCalculator({
                                            value:
                                                item.product.price *
                                                item.quantity,
                                            // discount: item.product.discount,
                                            extraPrice:
                                                item.capacity?.extraPrice +
                                                item.color?.extraPrice,
                                        })
                                    )}
                                </div>
                            </>
                        ) : (
                            <p className="flex-1 text-sm text-black/50 font-medium text-center">
                                {`SL: ${item.quantity}`}
                            </p>
                        )}

                        <div className="flex justify-center font-semibold ">
                            {formatCurrency(item.price)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex flex-1 items-center gap-2 ">
                {showCounter ? (
                    <>
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
                                buttonClassname="!w-7 !h-7 bg-secondary-variant-1/20 !rounded-full !text-black/50 !border-none hover:!bg-primary hover:!text-white"
                                inputClassname="!max-h-6 !w-8 !m-0 !p-0 border-none text-sm font-medium !bg-opacity-0"
                                className="!gap-px"
                            />
                        </div>
                        <div className=" flex-1 hidden sm:flex justify-center font-medium ">
                            {formatCurrency(
                                priceCalculator({
                                    value: item.product.price * item.quantity,
                                    // discount: item.product.discount,
                                    extraPrice:
                                        item.capacity?.extraPrice +
                                        item.color?.extraPrice,
                                })
                            )}
                        </div>
                    </>
                ) : (
                    <p className="flex-1 text-sm text-black/50 font-medium text-center">
                        {`SL: ${item.quantity}`}
                    </p>
                )}

                <div className="flex-1 flex justify-center font-bold">
                    {formatCurrency(item.price)}
                </div>
            </div>
        </div>
    );
};
export default CheckoutItem;
