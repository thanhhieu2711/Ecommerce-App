import Container from '@/components/Layout/Container';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TOrderInfo } from '@/types/general';
import { PaymentDetail } from '@/components/PaymentResult';

type Props = {
    orderId: string;
};

const PaymentResultCtn = ({ orderId }: Props) => {
    const [orderInfo, setOrderInfo] = useState<TOrderInfo>();
    const [loading, setLoading] = useState<boolean>(false);
    const getOrderinfo = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/orders/${orderId}`);
            const { data: _orderInfo, isSuccess } = data;
            if (isSuccess) {
                setOrderInfo(_orderInfo);
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
                <div className="w-full h-full min-h-[90vh] flex items-center justify-center py-6">
                    {!loading && (
                        <>
                            {orderInfo?.id ? (
                                <PaymentDetail orderInfo={orderInfo} />
                            ) : (
                                !orderInfo?.id && (
                                    <p>Không tìm thấy đơn hàng.</p>
                                )
                            )}
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default PaymentResultCtn;
