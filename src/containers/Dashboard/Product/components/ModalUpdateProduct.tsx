import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Modal } from '@/components/Common';
import {
    Input,
    InputNumber,
    Select,
    Upload,
    UploadFile,
    Form,
    Tag,
} from 'antd';
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
import { RcFile } from 'antd/es/upload';
import { capacityList, colorList } from '@/utils/constants/general';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
    isShow: boolean;
    onClose: () => void;
    product: TProductInfo;
    listCategory: TCategoryInfo[];
    listBrand: TBrandInfo[];
    callback: () => void;
};

export const ModalUpdateProduct = ({
    isShow,
    onClose,
    callback,
    product,
    listCategory,
    listBrand,
}: Props) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedColors, setSelectedColors] = useState<string[]>(
        product.color
    );
    const [selectedCapacities, setSelectedCapacities] = useState<string[]>(
        product.capacity
    );

    const handleGetFileImageFromUrl = useCallback(async () => {
        setLoading(true);
        try {
            const fileListFromUrl: UploadFile[] = [];
            for (let imgUrl of product.images) {
                const res = await axios.get(imgUrl, { responseType: 'blob' });
                const blob = res.data;
                const file = new File(
                    [blob],
                    product.images[0].split('/').at(-1) || '',
                    {
                        type: blob.type,
                        lastModified: Date.now(),
                    }
                );
                const updateFile: UploadFile = {
                    uid: `rc-upload-${Date.now()}`,
                    lastModified: file.lastModified,
                    name: file.name,
                    size: file.size,
                    status: 'done',
                    thumbUrl: imgUrl,
                    type: file.type,
                    originFileObj: {
                        uid: `rc-upload-${Date.now()}`,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: file.lastModified,
                        lastModifiedDate: new Date(),
                    } as RcFile,
                };
                fileListFromUrl.push(updateFile);
            }
            setFileList(fileListFromUrl);
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [product]);

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
                images: !!listurl.length ? listurl : product.images,
                discount: formData.discount / 100,
                price: Number(formData.price),
                color: selectedColors,
                capacity: selectedCapacities,
            });
            if (response.data.isSuccess) {
                await callback();
                onClose();
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
    const handleCheckedColor = useCallback(
        (color: string, isChecked: boolean) => {
            setSelectedColors((prev) => {
                if (!prev.includes(color) && isChecked) {
                    return [...prev, color];
                }
                if (!isChecked) {
                    return [
                        ...prev.filter(
                            (selectedColor) => selectedColor !== color
                        ),
                    ];
                }
                return prev;
            });
        },
        [selectedColors]
    );

    const handleCheckedCapacity = useCallback(
        (capacity: string, isChecked: boolean) => {
            setSelectedCapacities((prev) => {
                if (!prev.includes(capacity) && isChecked) {
                    return [...prev, capacity];
                }
                if (!isChecked) {
                    return [
                        ...prev.filter(
                            (selectedCapacity) => selectedCapacity !== capacity
                        ),
                    ];
                }
                return prev;
            });
        },
        [selectedCapacities]
    );

    useEffect(() => {
        handleGetFileImageFromUrl();

        form.setFieldValue('name', product.name);
        form.setFieldValue('quantity', product.quantity);
        form.setFieldValue('price', product.price);
        form.setFieldValue(
            'discount',
            (Number(product.discount) * 100).toString()
        );
        form.setFieldValue('status', product.status);
        form.setFieldValue('categoryId', product.categoryId);
        form.setFieldValue('brandId', product.brandId);
        form.setFieldValue('description', product.description);
        form.setFieldValue('specifications', product.specifications);
        form.setFieldValue('images', [] as UploadFile[]);
    }, []);

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
                disabled={loading}
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
                <Form.Item name="color" label="Màu sắc" className="flex-1">
                    {colorList.map((color) => (
                        <Tag.CheckableTag
                            key={color.id}
                            className={cn(
                                'px-3 py-[2px] border border-black/10',
                                selectedColors.includes(color.name) &&
                                    'bg-primary hover:bg-primary !border-transparent'
                            )}
                            checked={selectedColors.includes(color.name)}
                            onChange={(checked) => {
                                handleCheckedColor(color.name, checked);
                            }}
                        >
                            {color.name}
                        </Tag.CheckableTag>
                    ))}
                </Form.Item>
                <Form.Item
                    name="capacity"
                    label="Dung lượng"
                    className="flex-1"
                >
                    {capacityList.map((capacity) => (
                        <Tag.CheckableTag
                            key={capacity.id}
                            className={cn(
                                'px-3 py-[2px] border border-black/10',
                                selectedCapacities.includes(capacity.name) &&
                                    'bg-primary hover:bg-primary !border-transparent'
                            )}
                            checked={selectedCapacities.includes(capacity.name)}
                            onChange={(checked) => {
                                handleCheckedCapacity(capacity.name, checked);
                            }}
                        >
                            {capacity.name}
                        </Tag.CheckableTag>
                    ))}
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
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        required
                        className="flex-1"
                    >
                        <Select
                            size="large"
                            placeholder="Trạng Thái"
                            // defaultValue={{
                            //     label: 'Còn Hàng',
                            //     value: 'AVAILABLE',
                            // }}
                            options={[
                                {
                                    label: 'Còn Hàng',
                                    value: 'AVAILABLE',
                                },
                                {
                                    label: 'Hết Hàng',
                                    value: 'SOLDOUT',
                                },
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
                        readOnly={loading}
                        theme="snow"
                        modules={{
                            toolbar: toolbarOptions,
                        }}
                        placeholder={'Mô tả chi tiết sản phẩm ...'}
                    />
                </Form.Item>
                <Form.Item
                    name="specifications"
                    label="Thông số kỹ thuật"
                    required
                    rules={[
                        {
                            required: true,
                            message:
                                'Vui lòng nhập thông số kĩ thuật của sản phẩm',
                            validator(_, value) {
                                if (!value || value === '<p><br></p>') {
                                    return Promise.reject(
                                        'Vui lòng nhập thông số kĩ thuật của sản phẩm'
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
                        placeholder={'Thông số kỹ thuật của sản phẩm ...'}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUpdateProduct;
