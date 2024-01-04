import Container from '@/components/Layout/Container';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TOrderInfo } from '@/types/general';
import { formatCurrency, formatDate } from '@/utils/helper';

type Props = {
    orderId: string;
};

const PaymentResultCtn = ({ orderId }: Props) => {
    const [orderInfo, setOrderInfo] = useState<TOrderInfo>();
    const [loading, setLoading] = useState<boolean>(false);
    const getOrderinfo = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/orders/${orderId}`);
            const { data: _orderInfo, isSuccess } = data;
            if (isSuccess) {
                setOrderInfo(_orderInfo);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderinfo();
    }, [orderId]);

    return (
        <div className="w-full h-full bg-secondary ">
            <Container>
                <div className="w-full h-full min-h-screen flex items-center justify-center py-6">
                    {loading === false && orderInfo ? (
                        <div className="w-full max-w-[500px] flex flex-col  bg-white shadow-card rounded-lg p-4 sm:p-8 gap-6">
                            <div className="flex items-center justify-center gap-3">
                                <Image
                                    src={'/assets/images/successfully-ic.png'}
                                    alt="error-img"
                                    width={40}
                                    height={40}
                                    loading="lazy"
                                    objectFit="contain"
                                />
                                <p className="font-semibold text-2xl text-green-600">
                                    Đặt hàng thành công
                                </p>
                            </div>
                            <p className=" text-black/50 text-center ">
                                Cảm ơn bạn, chúng tôi đã nhận được đơn hàng của
                                bạn và sẽ liên hệ cho bạn sớm nhất có thể.
                            </p>
                            <div className="flex flex-col gap-3">
                                <p className="font-semibold">
                                    Chi tiết đơn hàng
                                </p>
                                <div className="border-y flex flex-col gap-4 px-4 py-6">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <p className="text-black/50">
                                            Mã đơn hàng:
                                        </p>
                                        <p className="font-medium">
                                            #{orderInfo.id}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <p className="text-black/50">
                                            Mã khách hàng:
                                        </p>
                                        <p className="font-medium">
                                            #{orderInfo.customerId}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-black/50">
                                            Tên người nhận:
                                        </p>
                                        <p className="font-medium">
                                            {orderInfo.nameReceiver}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-black/50">
                                            Số điện thoại nhận hàng:
                                        </p>
                                        <p className="font-medium">
                                            {orderInfo.phoneReceiver}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-between gap-2">
                                        <p className="text-black/50">
                                            Địa chỉ giao hàng:
                                        </p>
                                        <p className="font-medium">
                                            {orderInfo.deliveryAddressReceiver}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-black/50">
                                            Ngày tạo đơn hàng:
                                        </p>
                                        <p className="font-medium">
                                            {formatDate(orderInfo.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-black/50">
                                            Sản phẩm:
                                        </p>
                                        {orderInfo.orderItems.map(
                                            (item, index) => (
                                                <div
                                                    className="flex items-center justify-between"
                                                    key={item.id}
                                                >
                                                    <p className="font-medium">
                                                        {`${index + 1}. ${
                                                            item.product.name
                                                        }, ${item.quantity}`}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-black/50">
                                            Phương thức thanh toán:
                                        </p>
                                        <p className="font-medium">
                                            {orderInfo.paymentMethod}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <p className="text-black/50">
                                            Phương thức vận chuyển:
                                        </p>
                                        <p className="font-medium">
                                            {orderInfo.shippingServiceName}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-black/50">
                                            Phí vận chuyển:
                                        </p>
                                        <p className="font-medium">
                                            {formatCurrency(
                                                orderInfo.shippingFee
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 mt-2">
                                        <p className="text-black/50">
                                            Tổng tiền:
                                        </p>
                                        <p className="font-semibold text-xl">
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
                    ) : (
                        loading === false &&
                        !orderInfo && <p>Không tìm thấy đơn hàng</p>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default PaymentResultCtn;
