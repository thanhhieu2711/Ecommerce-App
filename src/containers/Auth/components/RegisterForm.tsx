import { Spinner } from '@/components/Common';
import { useAppDispatch } from '@/stores';
import { openRegisterModal, swapModal } from '@/stores/reducers/authModal';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import cn from 'classnames';
type Props = {};

const RegisterForm = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/register', data);
            if (response) {
                if (response.data.isSuccess) {
                    toast.success(response.data.message);
                    form.resetFields();
                    dispatch(openRegisterModal(false));
                } else {
                    toast.error(response.data.message);
                }
            }
            setLoading(false);
        } catch (err) {
            toast.error('Đăng ký thất bại , vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="basic"
            className="w-full flex flex-col"
            layout="vertical"
            scrollToFirstError
            onFinish={handleSubmit}
            autoComplete="off"
        >
            <Form.Item
                name={'email'}
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập email',
                    },
                    {
                        pattern: new RegExp(/@[^.]*\./),
                        message: 'Email không đúng định dạng',
                    },
                ]}
                className="mb-2"
            >
                <Input
                    size="large"
                    placeholder="abcxyz@gmail.com"
                    className=" "
                />
            </Form.Item>
            <Form.Item
                name={'phone'}
                label="Số điện thoại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại',
                    },
                    {
                        pattern: new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/),
                        message: 'Số điện thoại không hợp lệ',
                    },
                ]}
                className="mb-2"
            >
                <Input
                    prefix={
                        <p className="cursor-default text-black/50">(+84)</p>
                    }
                    size="large"
                    className=" "
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                required
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu',
                    },
                    {
                        pattern: new RegExp(
                            /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{8,}$/
                        ),
                        message:
                            'Tối thiểu là 8 ký tự và không chứa ký tự đặc biệt',
                    },
                ]}
                className="mb-2"
            >
                <Input.Password
                    min={1}
                    size="large"
                    placeholder="Nhập mật khẩu của bạn"
                    className=" "
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                required
                className="mb-10"
                rules={[
                    {
                        required: true,
                        message: 'Vui xác nhận mật khẩu',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('Mật khẩu không trùng khớp')
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    min={1}
                    size="large"
                    placeholder="Nhập mật khẩu của bạn"
                />
            </Form.Item>

            <button
                className={cn(
                    'w-full border border-black/20 py-2 rounded-lg hover:bg-black transition-all duration-200 ease-out hover:text-white',
                    loading && 'bg-black'
                )}
                type="submit"
                disabled={loading}
            >
                {!loading ? (
                    'Đăng ký'
                ) : (
                    <div className=" flex flex-row items-center justify-center">
                        <Spinner />
                    </div>
                )}
            </button>
            <div className="w-full pt-2">
                <p className="text-center">
                    Nếu bạn đã có tài khoản ? hãy đăng nhập{' '}
                    <Button
                        type="link"
                        className="p-0"
                        onClick={() => dispatch(swapModal())}
                    >
                        <p className="underline">tại đây</p>
                    </Button>
                    !
                </p>
            </div>
        </Form>
    );
};

export default RegisterForm;
