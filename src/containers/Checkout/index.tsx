'use client';
import Container from '@/components/Layout/Container';
import { useCart } from '@/hooks/store';
import { TbArrowBarToLeft } from 'react-icons/tb';
import Link from 'next/link';
import { CheckoutItem, EmptyCart, OrderDetail } from '@/components/Checkout';

type Props = {};

const CheckoutCtn = (props: Props) => {
    const { listCart, cartTotal, cartSubTotal, discountTotal } = useCart();

    return (
        <div className="h-full w-full bg-secondary py-[25px]">
            <Container>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1 flex flex-col h-fit sm:min-h-[495px] bg-white shadow-md rounded-lg p-3 relative">
                        {!!listCart.length && (
                            <>
                                <div className="flex items-center flex-wrap gap-1 p-4 ">
                                    <p className="font-medium text-xl">
                                        Giỏ hàng của bạn
                                    </p>
                                    <p className="text-sm">
                                        ({' '}
                                        <span className="text-red-600">*</span>{' '}
                                        Nhấn 2 lần để xóa )
                                    </p>
                                </div>
                                <div className=" border-[0.5px] border-black/10 mx-4 " />
                            </>
                        )}

                        {!!listCart.length ? (
                            <>
                                <div className="hidden sm:flex items-center p-4">
                                    <h3 className="font-semibold text-black/50 text-sm w-2/5 text-center">
                                        Sản phẩm
                                    </h3>
                                    <div className="flex-1 flex items-center justify-around">
                                        <h3 className="flex-1 flex justify-center font-semibold text-black/50 text-sm">
                                            Số lượng
                                        </h3>
                                        <h3 className="flex-1 flex justify-center font-semibold text-black/50 text-sm">
                                            Đơn giá
                                        </h3>
                                        <h3 className="flex-1 flex justify-center  font-semibold text-black/50 text-sm">
                                            Giá giảm
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-4 mb-6 mt-4 sm:mt-0">
                                    {listCart.map((item, index) => {
                                        return (
                                            <>
                                                <CheckoutItem
                                                    item={item}
                                                    index={index}
                                                    key={item.product.id}
                                                />
                                                {index !==
                                                    listCart.length - 1 && (
                                                    <div
                                                        key={item.product.id}
                                                        className="max-w-full h-px bg-black/10 mx-4"
                                                    />
                                                )}
                                            </>
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
                                <EmptyCart />
                            </div>
                        )}
                    </div>
                    <OrderDetail
                        listCart={listCart}
                        cartTotal={cartTotal}
                        cartSubTotal={cartSubTotal}
                        discountTotal={discountTotal}
                    />
                </div>
            </Container>
        </div>
    );
};

export default CheckoutCtn;
