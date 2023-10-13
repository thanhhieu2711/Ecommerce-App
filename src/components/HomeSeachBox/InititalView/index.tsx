import { TProductInfo } from '@/types/general';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiTrash, BiHistory } from 'react-icons/bi';
import { Button, Spinner } from '@/components/Common';
import Link from 'next/link';
import TrendingProductItem from './TrendingProductItem';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type Props = {
    trendingProducts: TProductInfo[];
};

const InitialView = ({ trendingProducts }: Props) => {
    return (
        <div className="w-full h-full flex flex-col gap-2 p-3">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-1">
                        <p className="font-medium">Lịch sử tìm kiếm</p>
                        <BiHistory className="w-5 h-5" />
                    </div>
                    <Button
                        className="flex flex-row items-center gap-1 text-black/50 hover:text-red-600  hover:font-medium !p-0"
                        theme="white"
                        variant="ghost"
                    >
                        <p className="text-sm">Xóa tất cả</p>
                        <BiTrash className="w-4 h-4" />
                    </Button>
                </div>
                <div className="text-sm text-black/50 flex flex-col gap-2">
                    <Link href={''} className="hover:underline">
                        IPhone 14 Pro Max 128gb
                    </Link>
                    <Link href={''} className="hover:underline">
                        IPhone 14 Pro Max 128gb
                    </Link>
                    <Link href={''} className="hover:underline">
                        IPhone 14 Pro Max 128gb
                    </Link>
                    <Link href={''} className="hover:underline">
                        IPhone 14 Pro Max 128gb
                    </Link>
                </div>
            </div>
            <div className="border-b border-black/5"></div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-1  w-full">
                        <p className="font-medium">Xu hướng sử tìm kiếm</p>
                        <BiHistory className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-1">
                    {trendingProducts.length <= 0
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <Skeleton
                                  key={index}
                                  direction="ltr"
                                  enableAnimation={true}
                                  height={50}
                                  className="!col-span-1 w-full xs:!w-[220px]"
                              />
                          ))
                        : trendingProducts.map((product) => {
                              return (
                                  <TrendingProductItem
                                      key={product.id}
                                      product={product}
                                  />
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default InitialView;
