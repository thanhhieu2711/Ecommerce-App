import { Form, FormInstance, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type Props = {
    formRef: FormInstance<any>;
    handleSubmit: (formData: any) => void;
};

export const ReceiverInfoForm = ({ formRef, handleSubmit }: Props) => {
    return (
        <div className="w-full flex flex-col gap-4 bg-white shadow-card rounded-lg p-4">
            <Form
                form={formRef}
                name="receiverInfo"
                className="w-full"
                layout="vertical"
                scrollToFirstError
                onFinish={handleSubmit}
            >
                <div className="w-full flex items-center gap-2">
                    <Form.Item
                        name={'nameReceiver'}
                        label="Họ và tên"
                        className="flex-1"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên',
                            },
                        ]}
                    >
                        <Input
                            placeholder="NGUYEN VAN A"
                            size="large"
                            className="w-full !text-black uppercase"
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        className="flex-1"
                        name={'phoneReceiver'}
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                            {
                                pattern: new RegExp(
                                    /(0[3|5|7|8|9])+([0-9]{8})\b/
                                ),
                                message: 'Số điện thoại không hợp lệ',
                            },
                        ]}
                    >
                        <Input
                            placeholder="(+84)"
                            size="large"
                            className="w-full !text-black"
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name={'deliveryAddressReceiver'}
                    label="Địa chỉ"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ',
                        },
                    ]}
                >
                    <Input
                        placeholder="Số nhà, tên tòa nhà, tên đường , khu vực "
                        size="large"
                        className="w-full !text-black"
                    />
                </Form.Item>
                <Form.Item name={'note'} label="Ghi chú">
                    <TextArea
                        placeholder="Ghi chú khác (nếu có)"
                        size="large"
                        className="w-full !text-black"
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ReceiverInfoForm;
