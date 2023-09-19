import { useEffect, useState } from 'react';
import { Modal } from '@/components/Common';
import { Input, InputNumber, Select, Upload, UploadFile, Form } from 'antd';
import toast from 'react-hot-toast';
import { toolbarOptions } from '@/configs';
import axios from 'axios';
import {
    handleGetOriginFileObj,
    handleUploadImagesToFirebase,
} from '@/utils/helper';
import { TBrandInfo, TCategoryInfo, TProductInfo } from '@/types/general';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
    isShow: boolean;
    onClose: () => void;
    product: TProductInfo;
    listCategory: TCategoryInfo[];
    listBrand: TBrandInfo[];
};

export const ModalUpdateProduct = ({
    isShow,
    onClose,
    product,
    listCategory,
    listBrand,
}: Props) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log(product);

        form.setFieldValue('name', product.name);
        form.setFieldValue('quantity', product.quantity);
        form.setFieldValue('price', product.price);
        form.setFieldValue(
            'discount',
            (Number(product.discount) * 100).toString()
        );
        form.setFieldValue('categoryId', product.categoryId);
        form.setFieldValue('brandId', product.brandId);
        form.setFieldValue('description', product.description);
        form.setFieldValue('images', [] as UploadFile[]);
    }, []);

    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const fileList = handleGetOriginFileObj(formData.images.fileList);
            const listurl = await handleUploadImagesToFirebase(
                fileList,
                'product'
            );

            const response = await axios.patch(`/api/products/${product.id}`, {
                ...formData,
                images: !!listurl ? product.images : listurl,
                discount: formData.discount / 100,
            });
            if (response.data.isSuccess) {
                router.refresh();
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

    return (
        <Modal
            header={'Chỉnh sửa sản phẩm'}
            onClose={onClose}
            isOpen={isShow}
            loadingSubmit={loading}
            onOk={() => form.submit()}
            showCloseIcon={false}
        >
            <Form
                form={form}
                name="updateProduct"
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
                        <Input min={1} className="w-full" size="large" />
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
                        accept=".png,.jpeg,.jpg,.webp"
                        action={'http://localhost:3000/'}
                        showUploadList={{ showPreviewIcon: false }}
                        beforeUpload={(fileUpload: UploadFile) => {
                            if (fileUpload) {
                                return false;
                            }
                        }}
                        onChange={({ fileList }) => {
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

export default ModalUpdateProduct;
