import cn from 'classnames';
import { Spinner } from '@/components/Common';
import { useAppDispatch } from '@/stores';
import { openLoginModal, swapAuthModal } from '@/stores/reducers/modal';
import { Button, Form, Input, Checkbox } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {};

const LoginForm = (props: Props) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);
            await signIn('credentials', {
                redirect: false,
                ...data,
            }).then((result) => {
                if (result?.error) {
                    return toast.error(result.error);
                } else {
                    toast.success('Đăng nhập thành công');
                    dispatch(openLoginModal(false));
                    form.resetFields();
                }
            });
        } catch (err) {
            console.log(err);
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
                className=" mb-2"
            >
                <Input
                    size="large"
                    placeholder="example@gmail.com"
                    className="focus:border-black hover:border-black"
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                required
                className="flex-1 mb-2"
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
            >
                <Input.Password
                    min={1}
                    size="large"
                    placeholder="Nhập mật khẩu của bạn"
                    className="focus:!border-black hover:!border-black "
                />
            </Form.Item>
            <Form.Item className="mb-0">
                <div className="py-0 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-3">
                        <Checkbox />
                        <p>Ghi nhớ mật khẩu</p>
                    </div>
                    <Button type="link">Quên mật khẩu?</Button>
                </div>
            </Form.Item>

            <button
                className={cn(
                    'w-full border border-black/20 py-2 rounded-lg mt-2 hover:bg-black transition-all duration-200 ease-out hover:text-white',
                    loading && 'bg-black'
                )}
                type="submit"
                disabled={loading}
            >
                {!loading ? (
                    'Đăng nhập'
                ) : (
                    <div className=" flex flex-row items-center justify-center">
                        <Spinner />
                    </div>
                )}
            </button>
            <div className="w-full pt-2 ">
                <p className="text-center text-sm ">
                    Nếu bạn chưa có tài khoản hãy đăng ký{' '}
                    <Button
                        type="link"
                        className="p-0"
                        onClick={() => dispatch(swapAuthModal())}
                    >
                        <p className="underline">tại đây</p>
                    </Button>
                    !
                </p>
            </div>
        </Form>
    );
};

export default LoginForm;
