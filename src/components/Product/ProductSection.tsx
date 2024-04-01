import cn from 'classnames';
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { TCategoryInfo, TProductInfo } from '@/types/general';
import { Button } from '../Common';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';

type Props = {
    category: TCategoryInfo;
    categoryNameModifier?: string;
    className?: string;
    isShowHeader?: boolean;
    isHotSale?: boolean;
};

const ProductSection = ({
    category,
    categoryNameModifier,
    isShowHeader = true,
    className,
    isHotSale,
}: Props) => {
    const router = useRouter();

    const getProducts = async (url: string) => {
        const { data } = await axios.get(url);
        return data.data;
    };
    const { data: products }: { data: TProductInfo[] } = useSWRImmutable(
        `/api/products/filter?categoryId=${category?.id || ''}&hotsale=${
            isHotSale || ''
        }`,
        getProducts
    );

    return (
        <div className={cn('w-full flex flex-col gap-2 sm:gap-4', className)}>
            {isShowHeader && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-xl sm:text-2xl text-black/80 uppercase ">
                            {categoryNameModifier || category.name}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={products?.length === 0}
                        onClick={() => {
                            router.push(
                                `/products?categoryId=${products[0]?.categoryId}`
                            );
                        }}
                    >
                        Xem tất cả
                    </Button>
                </div>
            )}
            <div className="flex-1 h-full">
                <Swiper
                    slidesPerView={2}
                    grabCursor
                    spaceBetween={12}
                    autoplay={
                        isHotSale && {
                            delay: 2000,
                            disableOnInteraction: false,
                        }
                    }
                    speed={500}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    // className="!p-1"
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        960: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 5,
                        },
                        1920: {
                            slidesPerView: 6,
                        },
                    }}
                    className="!p-1"
                >
                    {!!products?.length
                        ? products.map((product) => {
                              return (
                                  <SwiperSlide key={product.id}>
                                      <ProductCard product={product} />
                                  </SwiperSlide>
                              );
                          })
                        : Array.from({ length: 10 }).map((_, i) => (
                              <SwiperSlide key={i} className="h-full w-full">
                                  <div className="w-full">
                                      <Skeleton
                                          key={i}
                                          height={365}
                                          enableAnimation
                                          direction="ltr"
                                          duration={1.5}
                                          className="!rounded-lg "
                                      />
                                  </div>
                              </SwiperSlide>
                          ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductSection;
