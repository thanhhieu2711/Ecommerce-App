'use client';
import { CheckoutItem } from '@/components/Checkout';
import { Button } from '@/components/Common';
import Container from '@/components/Layout/Container';
import { CustomerInfoForm, ReceiverInfoForm } from '@/components/PaymentInfo';
import { Form } from 'antd';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

type Props = {};

const PaymentInfoCtn = (props: Props) => {
    const [form] = Form.useForm();

    const handleSubmitForm = (formData: any) => {
        console.log(formData);
    };

    return (
        <div className="h-full w-full bg-secondary">
            <Container>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full flex flex-col max-w-[700px] gap-6 relative mt-6 ">
                        <p className="text-lg font-semibold text-center">
                            Thông Tin Mua Hàng
                        </p>
                        <div className="w-full flex flex-col gap-4 bg-white shadow-card rounded-lg p-4">
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={
                                            '/assets/images/fallback_user.jpeg'
                                        }
                                        loading="lazy"
                                        alt="error-img"
                                        width={70}
                                        height={70}
                                        objectFit="contain"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold">
                                            iPhone 13 Pro{' '}
                                        </p>
                                        <div className="text-xs">
                                            <p>Màu sắc : đen</p>
                                            <p>Dung lượng : 128gb</p>
                                        </div>
                                    </div>
                                </div>
                                <p>SL: 1</p>
                                <p>10000000đ</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Thông Tin Khách Hàng</p>
                            <CustomerInfoForm />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Thông Tin Nhận Hàng</p>
                            <ReceiverInfoForm
                                formRef={form}
                                handleSubmit={handleSubmitForm}
                            />
                        </div>
                        <div className="sticky bottom-0 w-full max-w-[700px] bg-white shadow-box-login p-4 rounded-lg flex flex-col gap-3">
                            <div className="flex items-center justify-between font-semibold">
                                <p>Tổng tiền cần thanh toán:</p>
                                <p>10.000.000đ</p>
                            </div>
                            <Button
                                size="sm"
                                className="text-white font-semibold w-full"
                                onClick={() => form.submit()}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default PaymentInfoCtn;
