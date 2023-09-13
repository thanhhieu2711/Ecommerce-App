'use client';
import { useState } from 'react';
import { Modal, Input } from '@/components/Common';
import { toolbarOptions } from '@/configs/quillToolbarConfig';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type Props = {
    isShow: boolean;
    onClose: () => void;
};

type TFormCreateProduct = {
    name: string;
    quantity: string;
    description: string;
};

const ModalCreateProduct = ({ isShow, onClose }: Props) => {
    const [quill, setQuill] = useState<string>('');

    const methods = useForm<TFormCreateProduct>({
        defaultValues: {
            name: 'asdsadkjsal',
        },
    });

    const onSubmit: SubmitHandler<TFormCreateProduct> = (data) => {
        console.log('aksdjlsakd');
    };

    return (
        <Modal
            header={'Thêm sản phẩm'}
            onClose={onClose}
            isOpen={isShow}
            onOk={() => {}}
            contentContainerClassname="flex flex-col gap-6"
        >
            <form onSubmit={() => methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <Input
                        {...methods.register('name')}
                        label="Tên sản phẩm"
                        onChange={() => {}}
                    />
                    <Input
                        {...methods.register('quantity')}
                        label="Số lượng"
                        onChange={() => {}}
                    />
                    <ReactQuill
                        theme="snow"
                        value={quill}
                        onChange={setQuill}
                        modules={{
                            toolbar: toolbarOptions,
                        }}
                        placeholder="Mô tả chi tiết cho sản phẩm ..."
                    />
                </div>

                <div className="flex flex-row items-center justify-end gap-2  pt-6 border-t border-black/5">
                    <Button
                        className="bg-red-600 px-2 py-3 min-w-[80px]"
                        onClick={onClose}
                    >
                        <p>Hủy</p>
                    </Button>
                    <Button className="bg-green-600 px-2 py-3 min-w-[80px]">
                        <p>Đồng ý</p>
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalCreateProduct;
