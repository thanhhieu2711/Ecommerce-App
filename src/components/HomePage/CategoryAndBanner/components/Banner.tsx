import React from 'react';
import { bannerList } from '@/utils/constants/general';

// import required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../swiper.css';
import Image from 'next/image';

type Props = {};

const Banner = (props: Props) => {
    return (
        <div className="col-span-4 w-full h-full shadow-card">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop
                navigation={true}
                grabCursor
                modules={[Autoplay, Pagination, Navigation]}
                style={{
                    borderRadius: 8,
                }}
                className="!w-full !h-full"
            >
                {bannerList
                    .filter((banner) => banner.type !== 'sub')
                    .map((banner) => (
                        <SwiperSlide
                            key={banner.id}
                            className="w-full h-full aspect-w-16 aspect-h-5"
                        >
                            <Image
                                src={banner.path}
                                alt=""
                                loading="lazy"
                                fill
                                objectFit="center"
                                objectPosition="center"
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default Banner;
