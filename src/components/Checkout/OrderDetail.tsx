import { useCart } from '@/hooks/store';
import { TCartItem, TShippingService } from '@/types/general';
import { shippingServices } from '@/utils/constants/general';
import { formatCurrency } from '@/utils/helper';
import { Select } from 'antd';
import { useState } from 'react';
import { Button } from '../Common';

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
    useCart();
    // const router = useRouter();
    const [service, setService] = useState<Omit<TShippingService, 'id'>>(
        shippingServices[0]
    );

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
                        {!!listCart.length && !!service
                            ? formatCurrency(service.fee)
                            : formatCurrency(0)}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-black/50 text-sm font-semibold">VAT:</p>
                    <p>{formatCurrency(0)}</p>
                </div>

                {!!listCart.length && (
                    <div className="flex flex-col gap-4">
                        <p className="text-black/50 text-sm font-semibold">
                            Chọn đơn vị vận chuyển:
                        </p>
                        <Select
                            defaultValue={{
                                label: service.name,
                                value: service.fee,
                            }}
                            className="!w-full"
                            labelInValue
                            onChange={({ label, value }) => {
                                setService({
                                    name: label,
                                    fee: value,
                                });
                            }}
                            options={shippingServices.map((service) => ({
                                label: service.name,
                                value: service.fee,
                            }))}
                        />
                    </div>
                )}
                <div className="flex items-center justify-between mt-1">
                    <p className="text-black/50 text-sm font-semibold">
                        Phương thức thanh toán:
                    </p>
                    <p className="text-secondary-variant-2 font-semibold">
                        {' '}
                        COD
                    </p>
                </div>
            </div>
            <div className=" border-[0.5px] m-3 border-black/10" />
            <div className="flex flex-col gap-6 p-3">
                <div className="flex items-center justify-between">
                    <p className="text-md font-semibold">Tổng tiền :</p>
                    <p className="text-2xl font-semibold">
                        {!!listCart.length && !!service
                            ? formatCurrency(cartTotal + service.fee)
                            : formatCurrency(0)}
                    </p>
                </div>
                {!!listCart.length && (
                    <Button
                        size="sm"
                        className="text-white font-semibold"
                        onClick={() => {}}
                    >
                        Thanh Toán
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
