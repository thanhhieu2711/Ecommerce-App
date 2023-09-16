'use client';
import { useMemo, useState } from 'react';

import { Modal } from '@/components/Common';
import {
    Button,
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
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from 'firebase/storage';
import { firebaseStorage } from '@/services/firebase/firebaseDB';
// import { CreateProduct } from '@/app/api/products/route';
import { formatCurrency } from '@/utils/helper';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
    isShow: boolean;
    onClose: () => void;
};

export const ModalCreateProduct = ({ isShow, onClose }: Props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [price, setPrice] = useState<string>('');

    const handleGetOriginFileObj = (fileList: UploadFile[]) => {
        const tempArr: UploadFile['originFileObj'][] = [];
        fileList.forEach((item) => {
            tempArr.push(item.originFileObj);
        });
        return tempArr;
    };

    const handleSubmit = async (formData: any) => {
        const fileList = handleGetOriginFileObj(formData.images.fileList);
        const listurl = await handleUploadImagesToFirebase(fileList);
        console.log(listurl);
        const response = await axios.post('/api/products', {
            ...formData,
            images: listurl,
            discount: formData.discount / 100,
        });
        console.log(response);
    };

    const handleUploadImagesToFirebase = async (
        fileList: UploadFile['originFileObj'][]
    ) => {
        const listImageUrl: string[] = [];
        return new Promise(async (res, rej) => {
            for (let file of fileList) {
                if (file) {
                    const storageRef = ref(
                        firebaseStorage,
                        `product/${file?.name}`
                    );
                    const { ref: _ref } = await uploadBytes(storageRef, file);
                    const imageUrl = await getDownloadURL(_ref);
                    listImageUrl.push(imageUrl);
                }
            }
            res(listImageUrl);
        });
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
                                console.log(price);
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
                {/* <div className="flex gap-4 items-center">
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
                            // labelInValue
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
                            options={[
                                { value: 1, label: 'Apple' },
                                { value: 2, label: 'Apple' },
                                { value: 3, label: 'Apple' },
                                { value: 4, label: 'Apple' },
                                { value: 5, label: 'Apple' },
                            ]}
                        ></Select>
                    </Form.Item>
                </div> */}
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
                            // if (
                            //     fileUpload &&
                            //     fileUpload.size &&
                            //     fileUpload.size > 50000
                            // ) {
                            //     toast.error('Kích thước ảnh tối đa là 50KB');
                            //     return false;
                            // } else {
                            //     return false;
                            // }
                            if (fileUpload) {
                                // toast.error('Kích thước ảnh tối đa là 50KB');
                                return false;
                            }
                        }}
                        onChange={({ fileList, file }) => {
                            // if (file.size && file.size > 50000) {
                            //     setFileList((prev) => [...prev]);
                            //     return;
                            // }
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
