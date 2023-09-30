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

export const priceCalculator = ({
    value,
    extraPrice,
    discount,
}: {
    value: number;
    extraPrice?: number;
    discount?: number;
}) => {
    return value - value * (discount || 0) + value * (extraPrice || 0);
};

export const calculateRating = (ratings: number[]): number => {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0); // Tính tổng các giá trị rating trong mảng

    const averageRating = sum / ratings.length; // Tính giá trị trung bình của rating

    const maxRating = Math.max(...ratings); // Tìm giá trị rating lớn nhất trong mảng

    const scaleFactor = 5 / maxRating; // Tính tỷ lệ giữa rating tối đa (5) và rating lớn nhất

    const scaledAverageRating = averageRating * scaleFactor; // Áp dụng tỷ lệ lên giá trị trung bình

    return scaledAverageRating;
};

export function formatInputPrice(n: string) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDate(date: Date) {
    const dateObject = new Date(date);

    const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0 -> 11
    const year = dateObject.getUTCFullYear().toString();

    const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;
    return formattedDate;
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
