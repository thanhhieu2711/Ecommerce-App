import { TProductInfo } from '@/types/general';
import React from 'react';
import { Button } from '../Common';

type Props = {
    product: TProductInfo;
    handleExpanedDesc: () => void;
};

export const Description = ({ product, handleExpanedDesc }: Props) => {
    return (
        <div className="col-span-5 md:col-span-3">
            <div className="w-full h-full flex flex-col gap-4 relative">
                <p className="text-2xl font-medium">Mô tả chi tiết</p>
                <div
                    className=" text-justify h-full max-h-[900px] overflow-clip "
                    dangerouslySetInnerHTML={{
                        __html: product.description || '',
                    }}
                />
                <div className="absolute bg-white bottom-0 right-0 left-0 flex flex-row justify-center">
                    <div className="absolute w-full bg-fade pt-6 top-0 -translate-y-full"></div>
                    <Button
                        onClick={() => handleExpanedDesc}
                        className="mt-1 min-w-[150px] sm:min-w-[300px] border-black/50 hover:border-black/10"
                        size="md"
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
