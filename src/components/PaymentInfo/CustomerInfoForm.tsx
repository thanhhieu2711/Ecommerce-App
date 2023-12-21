import React, { useEffect } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { TUserInfo } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useForm } from 'antd/es/form/Form';
type Props = {};

export const CustomerInfoForm = (props: Props) => {
    const { data } = useSession();
    const user = data?.user;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldValue('name', user?.name);
        form.setFieldValue('phone', user?.phone);
        form.setFieldValue('email', user?.email);
    }, [user]);

    return (
        <div className="w-full flex flex-col gap-4 bg-white shadow-card rounded-lg p-4">
            <Form
                form={form}
                disabled={true}
                name="customerInfo"
                className="w-full"
                layout="vertical"
            >
                <div className="w-full flex items-center gap-2">
                    <Form.Item
                        className="flex-1"
                        name={'name'}
                        label="Họ và tên"
                    >
                        <Input
                            size="large"
                            className="w-full !text-black"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        name={'phone'}
                        label="Số điện thoại"
                    >
                        <Input size="large" className="w-full !text-black" />
                    </Form.Item>
                </div>
                <Form.Item name={'email'} label="Email">
                    <Input size="large" className="w-full !text-black" />
                </Form.Item>
                <div className="flex items-center gap-2">
                    <Checkbox disabled={false} defaultChecked={true} />
                    <p>
                        Bạn có muốn nhận hóa đơn online và thông báo ưu đãi từ
                        RAVENTECH bằng email này
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default CustomerInfoForm;
