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

type Props = {};

const Banner = (props: Props) => {
    return (
        <div className="col-span-4 h-full rounded-lg shadow-card bg-white ">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
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
            >
                {bannerList
                    .filter((banner) => banner.type !== 'sub')
                    .map((banner) => (
                        <SwiperSlide key={banner.id} className="w-full h-full">
                            <img
                                src={banner.path}
                                className="w-full h-full rounded-lg"
                                alt=""
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default Banner;
