import { Modal } from '@/components/Common';
import {
    handleGetOriginFileObj,
    handleUploadImagesToFirebase,
} from '@/utils/helper';
import { Form, Input, Upload, UploadFile } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type Props = {
    onClose: () => void;
    isShow: boolean;
};

const ModalCreateArticle = ({ onClose, isShow }: Props) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const fileImage = handleGetOriginFileObj(
                formData.thumbnail.fileList
            );
            const url = await handleUploadImagesToFirebase(
                fileImage,
                'articles'
            );
            const response = await axios.post('/api/articles', {
                ...formData,
                thumbnail: url.toString(),
            });
            if (response.data.isSuccess) {
                form.resetFields();
                setFileList([]);
                onClose();
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
            header={'Tạo bài viết'}
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
                    name={'title'}
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
                    label="Ảnh bài viết tối đa 1 ảnh"
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
                        {fileList.length < 1 && (
                            <div className="w-full border border-black/10 rounded-lg px-4 py-2">
                                Tải ảnh lên
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Nội dung"
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
                        placeholder={'Nội dung bài viết ...'}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateArticle;
