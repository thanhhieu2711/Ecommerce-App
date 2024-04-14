import { TOrderInfo } from '@/types/general';
import { formatCurrency, formatDate } from '@/utils/helper';
import Image from 'next/image';
import React from 'react';

type Props = {
    orderInfo: TOrderInfo;
};

export const PaymentDetail = ({ orderInfo }: Props) => {
    return (
        <div className="w-full max-w-[500px] flex flex-col  bg-white shadow-card rounded-lg p-4 sm:p-8 gap-6">
            <div className="flex items-center justify-center gap-3">
                {/* <Image
                    src={'/assets/images/successfully-ic.png'}
                    alt="error-img"
                    width={40}
                    height={40}
                    loading="lazy"
                    objectFit="contain"
                /> */}
                <p className="font-semibold text-2xl text-primary">
                    Đặt hàng thành công
                </p>
            </div>
            <p className=" text-black/50 text-center text-sm ">
                Cảm ơn bạn, chúng tôi đã nhận được đơn hàng của bạn và sẽ liên
                hệ cho bạn sớm nhất có thể.
            </p>
            <div className="flex flex-col gap-3">
                <p className="font-semibold">Chi tiết đơn hàng</p>
                <div className="border-y flex flex-col gap-4 px-4 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Mã đơn hàng:</p>
                        <p className="font-semibold">#{orderInfo.id}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Mã khách hàng:</p>
                        <p className="font-semibold">#{orderInfo.customerId}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Tên người nhận:</p>
                        <p className="font-semibold">
                            {orderInfo.nameReceiver}
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">
                            Số điện thoại nhận hàng:
                        </p>
                        <p className="font-semibold">
                            {orderInfo.phoneReceiver}
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Địa chỉ giao hàng:</p>
                        <p className="font-semibold">
                            {orderInfo.deliveryAddressReceiver}
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Ngày tạo đơn hàng:</p>
                        <p className="font-semibold">
                            {formatDate(orderInfo.createdAt)}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-black/50">Sản phẩm:</p>
                        {orderInfo.orderItems.map((item, index) => (
                            <div
                                className="flex items-center justify-between"
                                key={item.id}
                            >
                                <p className="font-semibold">
                                    {`${index + 1}. ${item.product.name} | ${
                                        item.quantity
                                    }`}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Phương thức thanh toán:</p>
                        <p className="font-semibold text-primary">
                            {orderInfo.paymentMethod}
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Phương thức vận chuyển:</p>
                        <p className="font-semibold">
                            {orderInfo.shippingServiceName}
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-black/50">Phí vận chuyển:</p>
                        <p className="font-semibold">
                            {formatCurrency(orderInfo.shippingFee)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                        <p className="text-black/50">Tổng tiền:</p>
                        <p className="font-bold text-xl">
                            {formatCurrency(orderInfo.total)}
                        </p>
                    </div>
                </div>
            </div>
            <Image
                src={'/assets/images/tks-signature.png'}
                width={130}
                height={130}
                className="!ml-auto mt-2"
                alt="error-img"
                loading="lazy"
                objectFit="contain"
            />
        </div>
    );
};

export default PaymentDetail;
