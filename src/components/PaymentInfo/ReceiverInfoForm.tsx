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
                        className="flex-1"
                        name={'name'}
                        label="Họ và tên"
                        required
                    >
                        <Input
                            size="large"
                            value={'LÊ THANH HIẾU'}
                            className="w-full !text-black"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        className="flex-1"
                        name={'phone'}
                        label="Số điện thoại"
                    >
                        <Input
                            size="large"
                            value={'0393296011'}
                            className="w-full !text-black"
                        />
                    </Form.Item>
                </div>
                <Form.Item name={'address'} label="Địa chỉ" required>
                    <Input
                        size="large"
                        value={'lethanhhieu2001@gmail.com'}
                        className="w-full !text-black"
                    />
                </Form.Item>
                <Form.Item name={'note'} label="Ghi chú">
                    <TextArea
                        size="large"
                        value={'lethanhhieu2001@gmail.com'}
                        className="w-full !text-black"
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ReceiverInfoForm;
