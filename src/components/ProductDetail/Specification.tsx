import cn from 'classnames';
import styles from './productdetail.module.css';
import { TProductInfo } from '@/types/general';
type Props = {
    product: TProductInfo;
};

export const Specification = ({ product }: Props) => {
    return (
        <div className="col-span-5 md:col-span-2">
            <div className="w-full h-full flex flex-col gap-4">
                <p className="text-2xl font-medium">Thông số kỹ thuật</p>
                <div
                    className={cn(
                        'text-justify border border-black/10 rounded-lg',

                        styles.specifications
                    )}
                    dangerouslySetInnerHTML={{
                        __html: product.specifications || '',
                    }}
                />
            </div>
        </div>
    );
};

export default Specification;
