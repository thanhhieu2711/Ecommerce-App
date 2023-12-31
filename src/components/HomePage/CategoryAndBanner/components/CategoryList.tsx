import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TCategoryInfo } from '@/types/general';
import Link from 'next/link';
import Image from 'next/image';
import { BiCategory } from 'react-icons/bi';
import useSWRImmutable from 'swr/immutable';

//Skeleton
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
    categories: TCategoryInfo[];
};

const CategoryList = ({ categories }: Props) => {
    return (
        <div className="col-span-4 rounded-lg border border-black/5 shadow-card bg-white">
            <div className="w-full h-full grid grid-cols-6">
                <div className="col-span-1 border-r border-black/10">
                    <div className="w-full h-full flex flex-row items-center justify-center gap-3">
                        <BiCategory className="icon-base" />
                        <p className="hidden md:block text-md font-medium cursor-default">
                            Danh mục
                        </p>
                    </div>
                </div>
                <div className="col-span-5">
                    <Swiper
                        spaceBetween={8}
                        slidesPerView={'auto'}
                        grabCursor
                        style={{
                            borderRadius: 8,
                            padding: '8px 16px',
                        }}
                    >
                        {!!categories?.length ? (
                            categories?.map((category) => (
                                <SwiperSlide
                                    key={category.id}
                                    className="hover:bg-secondary-variant-3 rounded-lg"
                                    onClick={() => {
                                        console.log('first');
                                    }}
                                >
                                    <Link
                                        href={`/category/${category.id}`}
                                        className="flex flex-row items-center justify-center gap-2 py-2 px-4"
                                    >
                                        <Image
                                            alt=""
                                            width={45}
                                            height={45}
                                            src={category.thumbnail}
                                            loading="lazy"
                                        />

                                        <p className="text-sm font-semibold ">
                                            {category.name}
                                        </p>
                                    </Link>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="flex flex-row items-center gap-2 px-4">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        width={150}
                                        height={60}
                                    />
                                ))}
                            </div>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
