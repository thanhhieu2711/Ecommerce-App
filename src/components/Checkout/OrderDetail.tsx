'use client';
import { TCartItem, TPaymentMethod, TShippingService } from '@/types/general';
import { PAYMENT_METHODS, SHIPPING_SERVICES } from '@/utils/constants/general';
import { formatCurrency } from '@/utils/helper';
import { Select } from 'antd';
import { Button } from '../Common';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/stores';
import { updateShippingService } from '@/stores/reducers/payment-info';
import { useSession } from 'next-auth/react';
import { openLoginModal } from '@/stores/reducers/modal';
import { usePaymentInfo } from '@/hooks/store';
import { useState } from 'react';
import axios from 'axios';
type Props = {
    listCart: TCartItem[];
    cartTotal: number;
    cartSubTotal: number;
    discountTotal: number;
};

export const OrderDetail = ({
    listCart,
    cartSubTotal,
    cartTotal,
    discountTotal,
}: Props) => {
    const { data } = useSession();

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { shippingService } = usePaymentInfo();

    const [_shippingService, setShippingService] = useState<
        Omit<TShippingService, 'id'>
    >({
        name: shippingService?.name || SHIPPING_SERVICES[0].name,
        fee: shippingService?.fee || SHIPPING_SERVICES[0].fee,
    });

    const [selectedPaymentMethod, setSelectPaymentMethod] =
        useState<TPaymentMethod>(PAYMENT_METHODS[0]);

    const handlePreCheckOut = () => {
        if (!!data) {
            dispatch(
                updateShippingService({
                    shippingService: _shippingService,
                })
            );
            router.push(
                `/checkout/payment-info?method=${selectedPaymentMethod}`
            );
            return;
        }
        dispatch(openLoginModal(true));
        return;
    };

    return (
        <div className="basis-[30%] bg-white shadow-md rounded-lg h-fit p-3">
            <div className="w-full flex gap-2 items-center p-3">
                <p className="font-medium text-xl">Chi tiết đơn hàng</p>
            </div>
            <div className=" border-[0.5px] m-3 border-black/10" />
            <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-between">
                    <p className="text-black/50 text-sm font-semibold">
                        Tạm tính:
                    </p>
                    <p className="">{formatCurrency(cartSubTotal)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-black/50 text-sm font-semibold">
                        Khuyến mãi:
                    </p>
                    <p className="">
                        {discountTotal
                            ? `- ${formatCurrency(discountTotal)}`
                            : formatCurrency(discountTotal)}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-black/50 text-sm font-semibold">
                        Phí vận chuyển:
                    </p>
                    <p className="">
                        {!!listCart.length
                            ? formatCurrency(_shippingService.fee)
                            : formatCurrency(0)}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-black/50 text-sm font-semibold">VAT:</p>
                    <p>{formatCurrency(0)}</p>
                </div>

                {!!listCart.length && (
                    <>
                        <div className="flex flex-col gap-4">
                            <p className="text-black/50 text-sm font-semibold">
                                Chọn đơn vị vận chuyển:
                            </p>
                            <Select
                                defaultValue={{
                                    label: _shippingService.name,
                                    value: _shippingService.fee,
                                }}
                                className="!w-full"
                                labelInValue
                                onChange={({ label, value }) => {
                                    setShippingService({
                                        name: label,
                                        fee: value,
                                    });
                                }}
                                options={SHIPPING_SERVICES.map((service) => ({
                                    label: service.name,
                                    value: service.fee,
                                }))}
                            />
                        </div>
                        <div className="flex flex-col gap-4 mt-1">
                            <p className="text-black/50 text-sm font-semibold">
                                Phương thức thanh toán:
                            </p>
                            <Select
                                defaultValue={{
                                    label: selectedPaymentMethod,
                                    value: selectedPaymentMethod,
                                }}
                                className="!w-full"
                                labelInValue
                                onChange={({ label, value }) => {
                                    setSelectPaymentMethod(value);
                                }}
                                options={PAYMENT_METHODS.map((method) => ({
                                    label: method,
                                    value: method,
                                }))}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className=" border-[0.5px] m-3 border-black/10" />
            <div className="flex flex-col gap-6 p-3">
                <div className="flex items-center justify-between">
                    <p className="text-md font-semibold">Tổng tiền :</p>
                    <p className="text-lg font-semibold">
                        {!!listCart.length
                            ? formatCurrency(cartTotal + _shippingService.fee)
                            : formatCurrency(0)}
                    </p>
                </div>
                {!!listCart.length && (
                    <Button
                        size="sm"
                        className="text-white font-semibold bg-primary-variant-2 hover:bg-primary-variant-2/80"
                        onClick={() => {
                            handlePreCheckOut();
                        }}
                    >
                        Thanh Toán
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
