import cn from 'classnames';
import styles from './productdetail.module.css';
import { TProductInfo } from '@/types/general';
import { Button } from '../Common';
import { useMediaQuery } from 'react-responsive';
type Props = {
    product: TProductInfo;
    handleExpanedSpecification: () => void;
};

export const Specification = ({
    product,
    handleExpanedSpecification,
}: Props) => {
    const isMobile = useMediaQuery({ query: '(max-width: 490px)' });

    return (
        <div className="col-span-5 md:col-span-2">
            <div className="w-full h-full flex flex-col gap-4">
                <p className="text-2xl font-semibold">Thông số kỹ thuật</p>
                <div className="max-h-[300px] overflow-clip md:max-h-full relative">
                    <div
                        className={cn(
                            'text-justify border border-black/10 rounded-lg',
                            styles.specifications
                        )}
                        dangerouslySetInnerHTML={{
                            __html: product.specifications || '',
                        }}
                    />
                    <div className=" absolute bg-white bottom-0 right-0 left-0 flex flex-row justify-center md:hidden">
                        <div className="absolute w-full bg-mask h-10 top-0 -translate-y-full"></div>
                        <Button
                            onClick={() => handleExpanedSpecification()}
                            className="mt-1 min-w-fit border-black/50 hover:border-black/10"
                            size={isMobile ? 'sm' : 'md'}
                            theme="white"
                            variant="outline"
                        >
                            Nhấn để xem thêm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Specification;
