'use client';
import { useState } from 'react';
import { Modal } from '@/components/Common';
import {
    Button,
    Input,
    InputNumber,
    Select,
    Upload,
    UploadFile,
    Form,
} from 'antd';
import toast from 'react-hot-toast';

import dynamic from 'next/dynamic';
import { toolbarOptions } from '@/configs';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
    isShow: boolean;
    onClose: () => void;
};

export const ModalCreateProduct = ({ isShow, onClose }: Props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Modal
            header={'Thêm sản phẩm'}
            onClose={onClose}
            isOpen={isShow}
            footer={
                <div className="w-full flex flex-row justify-end space-x-2">
                    <Button className="bg-red-600 text-white" onClick={onClose}>
                        Hủy bỏ
                    </Button>
                    <Button
                        className="bg-green-600 text-white"
                        onClick={form.submit}
                        htmlType="submit"
                    >
                        Đồng ý
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
                    label="Tên sản phẩm"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm',
                        },
                        { max: 5, message: 'Quá dài' },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>

                <div className="flex gap-4 items-center">
                    <Form.Item
                        name="quantity"
                        label="Số lượng"
                        required
                        className="flex-1"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng',
                            },
                        ]}
                    >
                        <InputNumber className="w-full" min={1} size="large" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Danh mục"
                        required
                        className="flex-1"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn danh mục',
                            },
                        ]}
                    >
                        <Select
                            size="large"
                            placeholder="Danh mục"
                            options={[
                                { value: 1, label: 'Điện thoại' },
                                { value: 2, label: 'Laptop' },
                                { value: 3, label: 'PC' },
                                { value: 4, label: 'Phụ kiện' },
                                { value: 5, label: 'Tai nghe' },
                            ]}
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        name="brand"
                        label="Thương hiệu"
                        required
                        className="flex-1"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn thương hiệu',
                            },
                        ]}
                    >
                        <Select
                            size="large"
                            placeholder="Thương hiệu"
                            options={[
                                { value: 1, label: 'Apple' },
                                { value: 2, label: 'Apple' },
                                { value: 3, label: 'Apple' },
                                { value: 4, label: 'Apple' },
                                { value: 5, label: 'Apple' },
                            ]}
                        ></Select>
                    </Form.Item>
                </div>
                <Form.Item
                    name="images"
                    label="Ảnh sản phẩm (tối đa 5 ảnh)"
                    required
                    rules={[
                        {
                            required: true,

                            validator: (_, value) => {
                                if (!value || value?.fileList?.length === 0) {
                                    return Promise.reject(
                                        'Vui lòng chọn ảnh sản phẩm'
                                    );
                                } else {
                                    return Promise.resolve(true);
                                }
                            },
                        },
                    ]}
                >
                    <Upload
                        multiple
                        maxCount={5}
                        listType="picture-card"
                        fileList={fileList}
                        accept=".png,.jpeg,.jpg"
                        action={'http://localhost:3000/'}
                        showUploadList={{ showPreviewIcon: false }}
                        beforeUpload={(fileUpload: UploadFile) => {
                            if (
                                fileUpload &&
                                fileUpload.size &&
                                fileUpload.size > 50000
                            ) {
                                toast.error('Kích thước ảnh tối đa là 50KB');
                                return false;
                            } else {
                                return false;
                            }
                        }}
                        onChange={({ fileList, file }) => {
                            if (file.size && file.size > 50000) {
                                setFileList((prev) => [...prev]);
                                return;
                            }
                            setFileList(fileList);
                        }}
                    >
                        {fileList.length === 5 ? null : (
                            <div style={{ marginTop: 8 }}>Upload</div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả sản phẩm',
                            validator(_, value) {
                                if (!value || value === '<p><br></p>') {
                                    return Promise.reject(
                                        'Vui lòng nhập mô tả sản phẩm'
                                    );
                                } else {
                                    return Promise.resolve(true);
                                }
                            },
                        },
                    ]}
                >
                    <ReactQuill
                        theme="snow"
                        modules={{
                            toolbar: toolbarOptions,
                        }}
                        placeholder={'Mô tả chi tiết sản phẩm ...'}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateProduct;
