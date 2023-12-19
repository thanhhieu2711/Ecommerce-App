'use client';
import cn from 'classnames';
import Counter from '@/components/Common/Counter';
import Container from '@/components/Layout/Container';
import { useCart } from '@/hooks/store';
import { useAppDispatch } from '@/stores';
import { decreaseQuantity, increaseQuantity } from '@/stores/reducers/cart';
import { formatCurrency, priceCalculator } from '@/utils/helper';
import Image from 'next/image';
import React from 'react';
import { TbArrowBarToLeft } from 'react-icons/tb';
import Link from 'next/link';

type Props = {};

const CheckoutCtn = (props: Props) => {
    const dispatch = useAppDispatch();
    const { listCart, cartQuantity, cartTotal } = useCart();
    return (
        <div className="h-full w-full bg-secondary py-[25px]">
            <Container>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1 flex flex-col min-h-[70vh] bg-white shadow-md rounded-lg p-3 relative">
                        <div className="w-full flex gap-2 items-center p-3">
                            <p className="font-medium text-xl">
                                Giỏ hàng của bạn
                            </p>
                            <p className="text-lg text-black/50">
                                ( {cartQuantity} )
                            </p>
                        </div>
                        <div className=" border-[0.5px] m-3 border-black/10" />

                        {!!listCart.length ? (
                            <>
                                <div className="flex items-center p-4">
                                    <h3 className="font-semibold text-black/50 text-sm w-2/5 text-center">
                                        Sản phẩm
                                    </h3>
                                    <div className="flex-1 flex items-center justify-around">
                                        <h3 className="font-semibold text-black/50 text-sm text-center">
                                            Số lượng
                                        </h3>
                                        <h3 className="font-semibold text-black/50 text-sm text-center">
                                            Đơn giá
                                        </h3>
                                        <h3 className="font-semibold text-black/50 text-sm text-center">
                                            Tổng tiền
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 mb-6">
                                    {listCart.map((item, index) => {
                                        return (
                                            <div
                                                key={item.product.id}
                                                className={cn(
                                                    'flex items-center px-4'
                                                )}
                                            >
                                                <div className="w-2/5 flex items-center gap-4">
                                                    <Image
                                                        width={70}
                                                        height={70}
                                                        objectFit="cover"
                                                        src={
                                                            item.product
                                                                .images[0]
                                                        }
                                                        alt="product-img"
                                                    />
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-sm font-medium">
                                                            {item.product.name}
                                                        </p>
                                                        {item.color && (
                                                            <p className="text-xs font-medium text-black/50">
                                                                Màu sắc :{' '}
                                                                {
                                                                    item.color
                                                                        .name
                                                                }
                                                            </p>
                                                        )}
                                                        {item.capacity && (
                                                            <p className="text-xs font-medium text-black/50">
                                                                Dung lượng :{' '}
                                                                {
                                                                    item
                                                                        .capacity
                                                                        .name
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-1 flex justify-around">
                                                    <div className=" flex items-center justify-center ">
                                                        <Counter
                                                            defaultValue={
                                                                item.quantity
                                                            }
                                                            handleDecrease={() =>
                                                                dispatch(
                                                                    decreaseQuantity(
                                                                        {
                                                                            index: index,
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                            handleIncrease={() =>
                                                                dispatch(
                                                                    increaseQuantity(
                                                                        {
                                                                            index: index,
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                            onChange={() => {}}
                                                            minValue={0}
                                                            isDisableInput={
                                                                true
                                                            }
                                                            buttonClassname="!w-8 !h-8 bg-secondary-variant-1/50 !rounded-full !text-black/50"
                                                            inputClassname="!max-h-6 !w-8 !m-0 !p-0 border-none text-sm font-medium !bg-opacity-0"
                                                            className="!gap-px"
                                                        />
                                                    </div>
                                                    <div className=" text-center font-medium ">
                                                        {formatCurrency(
                                                            priceCalculator({
                                                                value: item
                                                                    .product
                                                                    .price,
                                                                discount:
                                                                    item.product
                                                                        .discount,
                                                                extraPrice:
                                                                    item
                                                                        .capacity
                                                                        ?.extraPrice +
                                                                    item.color
                                                                        ?.extraPrice,
                                                            })
                                                        )}
                                                    </div>
                                                    <div className=" text-center font-medium ">
                                                        {formatCurrency(
                                                            item.price
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className=" bottom-4 left-6 flex items-center gap-2 !text-secondary-variant-2 font-medium text-sm cursor-pointer mt-auto mx-3">
                                    <TbArrowBarToLeft className="icon-base" />
                                    <Link href={'/'}>Tiếp tục mua sắm</Link>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 grid place-items-center">
                                <p className="text-3xl font-bold">
                                    Giỏ hàng trống
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="basis-[30%] bg-white shadow-md rounded-lg h-fit p-3">
                        <div className="w-full flex gap-2 items-center p-3">
                            <p className="font-medium text-xl">
                                Chi tiết đơn hàng
                            </p>
                        </div>
                        <div className=" border-[0.5px] m-3 border-black/10" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutCtn;
