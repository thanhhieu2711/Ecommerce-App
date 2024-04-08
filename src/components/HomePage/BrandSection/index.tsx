import { TBrandInfo } from '@/types/general';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

type Props = {
    brands: TBrandInfo[];
};

const BrandSection = ({ brands }: Props) => {
    return (
        <div className="flex flex-col gap-6">
            <p className="uppercase text-lg font-bold xl:text-2xl">
                thương hiệu nổi bật
            </p>
            <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-4 2xl:grid-cols-13">
                {!!brands?.length
                    ? brands?.map((i) => (
                          <Link
                              href={`/products?brandId=${i.id}`}
                              key={i.id}
                              className="col-span-1 shadow-card px-4 py-2 rounded-md "
                          >
                              <div className="aspect-w-2 aspect-h-1">
                                  <Image
                                      fill
                                      objectFit="contain"
                                      objectPosition="center"
                                      alt="brand-logo"
                                      src={i?.thumbnail}
                                      quality={50}
                                  />
                              </div>
                          </Link>
                      ))
                    : Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="cols-span-1">
                              <Skeleton className="aspect-w-2 aspect-h-1" />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default BrandSection;
