import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { discountPromotions } from '@/utils/constants/general';
import Image from 'next/image';

type Props = {};

const DiscountPromotion = (props: Props) => {
    return (
        <div className="flex-1 flex flex-col gap-2 sm:gap-6">
            <p className="uppercase text-lg xl:text-2xl font-bold">
                chương trình ưu đãi
            </p>
            <div className="flex-1">
                <Swiper
                    slidesPerView={2}
                    grabCursor
                    spaceBetween={12}
                    speed={500}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    // className="!p-1"
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                    }}
                    className="!p-1"
                >
                    {discountPromotions.map((i) => (
                        <SwiperSlide key={i.id}>
                            <div className="aspect-w-5 aspect-h-2 !h-auto  rounded-xl">
                                <Image
                                    className="!rounded-xl shadow-product-card"
                                    fill
                                    objectFit="cover"
                                    objectPosition="center"
                                    alt="discount-promotion"
                                    quality={50}
                                    src={i?.image}
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default DiscountPromotion;
