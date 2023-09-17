'use client';
import { useEffect, useState } from 'react';

import { Button, Modal, Spinner } from '@/components/Common';
import {
    Input,
    InputNumber,
    Select,
    Upload,
    UploadFile,
    Form,
    Tooltip,
} from 'antd';
import toast from 'react-hot-toast';

import dynamic from 'next/dynamic';
import { toolbarOptions } from '@/configs';
import axios from 'axios';
import {
    handleGetOriginFileObj,
    handleUploadImagesToFirebase,
} from '@/utils/helper';
import { TBrandInfo, TCategoryInfo } from '@/types/general';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
    isShow: boolean;
    onClose: () => void;
};

export const ModalCreateProduct = ({ isShow, onClose }: Props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [price, setPrice] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<TCategoryInfo[]>([]);
    const [listBrand, setListBrand] = useState<TBrandInfo[]>([]);

    const handleGetListCategory = async () => {
        try {
            const response = await axios.get('/api/category');
            response.data.data && setListCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetListBrand = async () => {
        try {
            const response = await axios.get('/api/brand');
            response.data.data && setListBrand(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const fileList = handleGetOriginFileObj(formData.images.fileList);
            const listurl = await handleUploadImagesToFirebase(
                fileList,
                'product'
            );
            const response = await axios.post(
                '/api/product',
                {
                    ...formData,
                    images: listurl,
                    discount: formData.discount / 100,
                },
                {}
            );
            if (response.data.isSuccess) {
                form.resetFields();
                setFileList([]);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Lỗi hệ thống , vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetListCategory();
        handleGetListBrand();
    }, [form]);

    return (
        <Modal
            header={'Thêm sản phẩm'}
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
                    label="Tên sản phẩm"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sản phẩm',
                        },
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
                        name="price"
                        label="Giá sản phẩm"
                        required
                        className="flex-1"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá tiền',
                            },
                            {
                                pattern: new RegExp(/^[1-9]|10*$/),
                                message: 'Giá tiền không hợp lệ',
                            },
                        ]}
                    >
                        <Input
                            min={1}
                            className="w-full"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            size="large"
                        />
                        {/* <Tooltip
                            trigger={['focus']}
                            title={formatCurrency(+price)}
                            placement="topLeft"
                            overlayClassName="numeric-input"
                            
                        /> */}
                    </Form.Item>
                    <Form.Item
                        name="discount"
                        label="Khuyến mãi"
                        className="flex-1"
                        rules={[]}
                        initialValue={0}
                    >
                        <InputNumber
                            formatter={(value) => `${value}%`}
                            className="w-full"
                            min={0}
                            max={100}
                            size="large"
                        />
                    </Form.Item>
                </div>
                <div className="flex gap-4 items-center">
                    <Form.Item
                        name="categoryId"
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
                            options={listCategory.map((item) => {
                                return {
                                    label: item.name,
                                    value: item.id,
                                };
                            })}
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        name="brandId"
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
                            options={listBrand.map((item) => {
                                return {
                                    label: item.name,
                                    value: item.id,
                                };
                            })}
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
                            if (fileUpload) {
                                return false;
                            }
                        }}
                        onChange={({ fileList, file }) => {
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
