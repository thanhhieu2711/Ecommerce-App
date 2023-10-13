import cn from 'classnames';
import { TProductInfo } from '@/types/general';
import { Button } from '../Common';
import { useMediaQuery } from 'react-responsive';
type Props = {
    product: TProductInfo;
    handleExpanedDesc: () => void;
};

export const Description = ({ product, handleExpanedDesc }: Props) => {
    const isMobile = useMediaQuery({ query: '(max-width: 490px)' });
    return (
        <div className="col-span-5 md:col-span-3 h-fit">
            <div className="w-full h-full flex flex-col gap-4 relative">
                <p className="text-2xl font-semibold">Mô tả chi tiết</p>
                <div
                    className=" text-justify h-full max-h-[500px] md:!max-h-[900px] overflow-clip "
                    dangerouslySetInnerHTML={{
                        __html: product.description || '',
                    }}
                />
                <div className="absolute bg-white bottom-0 right-0 left-0 flex flex-row justify-center">
                    <div className="absolute w-full bg-mask h-10 top-0 -translate-y-full"></div>
                    <Button
                        onClick={() => handleExpanedDesc()}
                        className="mt-1 min-w-fit md:min-w-[250px] border-black/50 hover:border-black/10"
                        size={isMobile ? 'sm' : 'md'}
                        theme="white"
                        variant="outline"
                    >
                        Nhấn để xem thêm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Description;
