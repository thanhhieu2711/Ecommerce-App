import { TProductInfo } from '@/types/general';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './specifications.module.css';
type Props = {
    pid: string;
};

const ProductDetailCtn = ({ pid }: Props) => {
    const [product, setProduct] = useState<TProductInfo>({} as TProductInfo);
    const getProductDetail = async () => {
        const { data } = await axios.get(`/api/product/${pid}`);
        data.isSuccess && setProduct(data.data);
    };

    useEffect(() => {
        getProductDetail();
    }, [pid]);
    return (
        <div className="h-full w-[350px]">
            <div
                className={styles.detail}
                dangerouslySetInnerHTML={{ __html: product.description ?? '' }}
            ></div>
        </div>
    );
};

export default ProductDetailCtn;
