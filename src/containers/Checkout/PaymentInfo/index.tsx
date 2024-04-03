'use client';
import axios from 'axios';
import { CheckoutItem } from '@/components/Checkout';
import { Button } from '@/components/Common';
import LoadingPage from '@/components/Common/LoadingPage';
import Container from '@/components/Layout/Container';
import { CustomerInfoForm, ReceiverInfoForm } from '@/components/PaymentInfo';
import { useCart } from '@/hooks/store';
import usePaymentInfo from '@/hooks/store/usePaymentInfo';
import { formatCurrency } from '@/utils/helper';
import { Form } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { TOrderDetailInfo, TOrderInfo } from '@/types/general';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/stores';
import { clearShippingService } from '@/stores/reducers/payment-info';
import { clearCart } from '@/stores/reducers/cart';

type Props = {};

const PaymentInfoCtn = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { listCart, discountTotal, cartSubTotal } = useCart();
    const { total, shippingService } = usePaymentInfo();
    const [form] = Form.useForm();
    const { data } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmitFormOrder = async (receiverFormData: any) => {
        try {
            setLoading(true);
            if (listCart.length === 0 || data === null) {
                toast.error('Thanh toán không thành công !');
                return;
            }
            const createOrderData: TOrderInfo = {
                customerId: data?.user.id.toString(),
                discountTotal: discountTotal,
                subTotal: cartSubTotal,
                total: total,
                shippingServiceName: shippingService?.name,
                shippingFee: shippingService?.fee,
                note: receiverFormData?.note || '',
                ...receiverFormData,
            };

            const createOrderReq = await axios.post(
                '/api/orders',
                createOrderData
            );

            const {
                isSuccess,
                data: orderData,
                message,
            }: {
                isSuccess: boolean;
                data: TOrderInfo;
                message: string;
            } = createOrderReq.data;

            if (isSuccess) {
                const createOrderDetailData: TOrderDetailInfo[] = listCart.map(
                    (item) => {
                        return {
                            orderId: orderData.id,
                            price: item.price,
                            quantity: item.quantity.toString(),
                            productId: item.product.id,
                        } as TOrderDetailInfo;
                    }
                );

                const createOrderDetailsRes = await axios.post(
                    '/api/order-detail',
                    {
                        orderDetails: createOrderDetailData,
                    }
                );

                const { isSuccess: _isSucess } = createOrderDetailsRes.data;

                if (_isSucess) {
                    dispatch(clearCart({ isShowToast: false }));
                    dispatch(clearShippingService());
                    form.setFieldValue('nameReceiver', '');
                    form.setFieldValue('phoneReceiver', '');
                    form.setFieldValue('deliveryAddressReceiver', '');
                    form.setFieldValue('note', '');
                    router.push(`/checkout/payment-result/${orderData.id}`);
                    setLoading(false);
                    toast.success(message);
                    return;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full w-full bg-secondary">
            <Container>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full flex flex-col max-w-[700px] gap-6 relative mt-6 ">
                        <p className="text-xl font-semibold text-center uppercase">
                            Thông Tin Mua Hàng
                        </p>
                        <div className="w-full flex flex-col gap-4 bg-white shadow-card rounded-lg p-4">
                            {!!listCart.length ? (
                                listCart.map((item, index) => (
                                    <CheckoutItem
                                        key={item.product.id}
                                        index={index}
                                        item={item}
                                        showCounter={false}
                                    />
                                ))
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={'/assets/images/cart-empty.webp'}
                                        objectFit="cover"
                                        width={200}
                                        height={200}
                                        alt="error-img"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Thông Tin Khách Hàng</p>
                            <CustomerInfoForm />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Thông Tin Nhận Hàng</p>
                            <ReceiverInfoForm
                                formRef={form}
                                handleSubmit={handleSubmitFormOrder}
                            />
                        </div>
                        <div className="sticky bottom-0 w-full max-w-[700px] bg-white shadow-box-login p-4 rounded-lg flex flex-col gap-3">
                            <div className="flex text-md font-semibold items-center justify-between ">
                                <p>Tổng tiền thanh toán:</p>
                                <p>{formatCurrency(total)}</p>
                            </div>
                            <Button
                                size="sm"
                                className="text-white !text-md font-semibold w-full"
                                onClick={() => form.submit()}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
                {loading && <LoadingPage overlayBackground />}
            </Container>
        </div>
    );
};

export default PaymentInfoCtn;
