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

    return (
        <Modal
            header={'Chi tiết sản phẩm'}
            onClose={onClose}
            isOpen={isShow}
            loadingSubmit={loading}
            onOk={() => form.submit()}
            showCloseIcon={false}
        >
            <div className="flex flex-col"></div>
        </Modal>
    );
};

export default ModalUpdateProduct;
