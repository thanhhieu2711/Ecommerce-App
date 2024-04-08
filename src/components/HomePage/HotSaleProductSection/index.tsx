import ProductSection from '@/components/Product/ProductSection';
import { TCategoryInfo } from '@/types/general';
import Image from 'next/image';
import React from 'react';
type Props = {};

const HotProductSection = (props: Props) => {
    return (
        <div
            className="w-full px-2 pb-2 bg-black shadow-card rounded-2xl"
            style={{
                background: `url('/assets/images/banner/banner-newyear.webp') no-repeat center / cover`,
            }}
        >
            <div className="max-w-full aspect-w-3 aspect-h-3 flex items-center justify-center py-10 my-2">
                <Image
                    src={'/assets/images/banner/hot-sale-cuoi-tuan-final.gif'}
                    alt=""
                    fill
                    objectFit="contain"
                    objectPosition="center"
                    quality={50}
                    loading="lazy"
                />
            </div>
            <ProductSection
                isHotSale={true}
                isShowHeader={false}
                category={{} as TCategoryInfo}
            />
        </div>
    );
};

export default HotProductSection;
