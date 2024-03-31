import { firebaseStorage } from '@/services/firebase/firebaseDB';
import { UploadFile } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { capacityList, colorList } from '@/utils/constants/general';
import {
    TCapacityInfo,
    TCartItem,
    TColorInfo,
    TProductInfo,
} from '@/types/general';

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
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0 -> 11 nên phải + thêm 1
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
            console.log(error);
            rej(error);
        }
    });
};

export const getInitialColorAndCapacity = ({
    product,
}: {
    product: TProductInfo;
}) => {
    const color = colorList
        .filter((color) => {
            return product.color?.find((_color) => _color === color.name);
        })
        .sort((a, b) => a.extraPrice - b.extraPrice)[0];
    const capacity = capacityList
        .filter((capacity) => {
            return product.capacity?.find(
                (_capacity) => _capacity === capacity.name
            );
        })
        .sort((a, b) => a.extraPrice - b.extraPrice)[0];

    return {
        color: color || ({} as TColorInfo),
        capacity: capacity || ({} as TCapacityInfo),
    };
};

export const getDiscountPrice = (listCart: TCartItem[]): number => {
    const result = listCart.reduce((total, cartItem) => {
        const { product, capacity, color, quantity } = cartItem;
        return (total +=
            (priceCalculator({
                value: product.price,
                extraPrice:
                    (capacity?.extraPrice || 0) + (color?.extraPrice || 0),
            }) -
                priceCalculator({
                    value: product.price,
                    extraPrice:
                        (capacity?.extraPrice || 0) + (color?.extraPrice || 0),
                    discount: product.discount,
                })) *
            quantity);
    }, 0);
    return result;
};
