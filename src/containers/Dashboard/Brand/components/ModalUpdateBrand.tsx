'use client';
import { useState } from 'react';
import { Button, Modal, Spinner } from '@/components/Common';
import { Input, Upload, UploadFile, Form } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
    handleGetOriginFileObj,
    handleUploadImagesToFirebase,
} from '@/utils/helper';
import { TBrandInfo } from '@/types/general';

type Props = {
    isShow: boolean;
    onClose: () => void;
    brand: TBrandInfo;
};

export const ModalUpdateBrand = ({ isShow, onClose, brand }: Props) => {
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

            const response = await axios.patch('/api/brands', {
                id: brand.id,
                ...formData,
                thumbnail: url?.toString(),
            });

            if (response.data.isSuccess) {
                form.resetFields();
                setFileList([]);
                toast.success(response.data.message);
                onClose();
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
            header={'Chỉnh sửa thương hiệu'}
            onClose={onClose}
            isOpen={isShow}
            onOk={form.submit}
            loadingSubmit={loading}
        >
            <Form
                form={form}
                name="createBrand"
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
                    <Input defaultValue={brand.name} size="large" />
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

export default ModalUpdateBrand;
