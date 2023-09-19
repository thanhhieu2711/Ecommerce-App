import { firebaseStorage } from '@/services/firebase/firebaseDB';
import { UploadFile } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const formatCurrency = (value: number) => {
    const formatValue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);

    return formatValue;
};

export function formatInputPrice(n: string) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const handleGetOriginFileObj = (fileList: UploadFile[]) => {
    const tempArr: UploadFile['originFileObj'][] = [];
    fileList?.forEach((item) => {
        tempArr.push(item.originFileObj);
    });
    return tempArr;
};

export const handleUploadImagesToFirebase = async (
    fileList: UploadFile['originFileObj'][],
    pathName: string
): Promise<string[]> => {
    const listImageUrl: string[] = [];

    if (fileList.length === 0) {
        return listImageUrl;
    }
    return new Promise(async (res, rej) => {
        try {
            for (let file of fileList) {
                console.log('check');
                if (file) {
                    const storageRef = ref(
                        firebaseStorage,
                        `${pathName}/${file?.name}`
                    );
                    const { ref: _ref } = await uploadBytes(storageRef, file);
                    const imageUrl = await getDownloadURL(_ref);
                    listImageUrl.push(imageUrl);
                }
            }
            res(listImageUrl);
        } catch (error) {
            rej(listImageUrl);
        }
    });
};
