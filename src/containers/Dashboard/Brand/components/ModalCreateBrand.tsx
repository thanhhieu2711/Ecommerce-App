'use client';
import {  useState } from 'react';

import { Button, Modal, Spinner } from '@/components/Common';
import {
    Input,
    Upload,
    UploadFile,
    Form,
} from 'antd';
import toast from 'react-hot-toast';

import axios from 'axios';
import {
    handleGetOriginFileObj,
    handleUploadImagesToFirebase,
} from '@/utils/helper';

type Props = {
    isShow: boolean;
    onClose: () => void;
};

export const ModalCreateBrand = ({ isShow, onClose }: Props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const fileImage = handleGetOriginFileObj(
                formData.thumbnail.fileList
            );
            const url = await handleUploadImagesToFirebase(fileImage, 'brand');
            const response = await axios.post('/api/brand', {
                ...formData,
                thumbnail: url?.toString(),
            });
            if (response.data.isSuccess) {
                form.resetFields();
                setFileList([]);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Lỗi hệ thống , vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            header={'Thêm thương hiệu'}
            onClose={onClose}
            isOpen={isShow}
            footer={
                <div className="w-full flex flex-row justify-end space-x-2">
                    <Button
                        className="min-w-[110px] !bg-green-600 text-white"
                        size="sm"
                        onClick={form.submit}
                        disabled={loading}
                    >
                        {!loading ? (
                            <p>Thêm</p>
                        ) : (
                            <Spinner
                                color="text-white/50"
                                fillActive="fill-white"
                            />
                        )}
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                name="basic"
                className="w-full"
                layout="vertical"
                scrollToFirstError
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    name={'name'}
                    label="Tên thương hiệu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên danh mục',
                        },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item
                    name="thumbnail"
                    label="Ảnh danh mục tối đa 1 ảnh"
                    required
                    rules={[
                        {
                            required: true,

                            validator: (_, value) => {
                                if (!value || value?.fileList?.length === 0) {
                                    return Promise.reject(
                                        'Vui lòng chọn ảnh danh mục'
                                    );
                                } else {
                                    return Promise.resolve(true);
                                }
                            },
                        },
                    ]}
                >
                    <Upload
                        {...form}
                        maxCount={1}
                        listType="picture"
                        fileList={fileList}
                        accept=".png,.jpeg,.jpg,webp"
                        action={'http://localhost:3000/'}
                        showUploadList={{ showPreviewIcon: false }}
                        beforeUpload={(fileUpload: UploadFile) => {
                            if (fileUpload) {
                                return false;
                            } else {
                                return true;
                            }
                        }}
                        onChange={({ fileList }) => {
                            setFileList(fileList);
                        }}
                    >
                        <Button
                            className="mt-2 px-4 py-2 rounded-lg"
                            theme="white"
                            variant="outline"
                        >
                            Tải ảnh lên
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateBrand;
