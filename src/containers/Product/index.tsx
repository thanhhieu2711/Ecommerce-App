'use client';
import { Button } from '@/components/Common';
import LoadingPage from '@/components/Common/LoadingPage';
import Container from '@/components/Layout/Container';
import ProductCard from '@/components/Product/ProductCard';
import {
    TPaginationResponse,
    TProductInfo,
    TSearchParam,
} from '@/types/general';
import { SORT_OPTIONS } from '@/utils/constants/general';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Popover, Rate, Slider } from 'antd';
import { formatCurrency } from '@/utils/helper';
import { BiSort } from 'react-icons/bi';
import { RiFilterLine } from 'react-icons/ri';

type Props = {};

const ProductListCtn = (props: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paramsKeyValuePair: Record<string, string> = {};
    const [products, setProducts] = useState<TProductInfo[]>(
        [] as TProductInfo[]
    );

    const [loading, setLoading] = useState<Boolean>(false);
    const [priceMark, setPriceMark] = useState<number>();
    const [pagination, setPagination] = useState<TPaginationResponse>({
        pageNumber: 1,
    } as TPaginationResponse);

    const [currentPage, setCurrentPage] = useState(1);

    searchParams.forEach((value, key) => {
        if (key !== '') {
            paramsKeyValuePair[key] = value;
        } else {
            return router.push('/products');
        }
    });

    const handleGetProducts = async (isReset = false) => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products/filter', {
                params: {
                    ...paramsKeyValuePair,
                    page: isReset ? 1 : currentPage,
                },
            });

            if (data.isSuccess) {
                setProducts((prev) =>
                    isReset ? data.data : [...prev, ...data.data]
                );
                setPagination(data.pagination);
            }

            if (!searchParams.has('priceRange')) {
                const highestPrice = Math.max(
                    ...data.data.map((p: TProductInfo) => p.price)
                );

                const lowestPrice = Math.min(
                    ...data.data.map((p: TProductInfo) => p.price)
                );

                const lowestPriceStorage =
                    Number(localStorage.getItem('lowestPrice')) || 0;

                const highestPriceStorage =
                    Number(localStorage.getItem('highestPrice')) || 0;

                console.log(lowestPriceStorage, highestPriceStorage);

                if (lowestPrice < lowestPriceStorage) {
                    localStorage.setItem('lowestPrice', `${lowestPrice}`);
                } else {
                    localStorage.setItem('lowestPrice', `${lowestPrice}`);
                }

                if (highestPrice > highestPriceStorage) {
                    localStorage.setItem('highestPrice', `${highestPrice}`);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchParams = (param: TSearchParam) => {
        const params = new URLSearchParams(searchParams);
        if (param) {
            if (params.has(param.key)) {
                if (
                    (param.key === 'priceRange' &&
                        Number(param.value) > Number(lowestPrice)) ||
                    (param.key === 'ratting' && Number(param.value) > 0)
                ) {
                    params.delete(param.key);
                    params.set(param.key, `${param.value}`);
                } else {
                    params.delete(param.key);
                }
            } else {
                if (
                    (param.key === 'priceRange' &&
                        Number(param.value) === Number(lowestPrice)) ||
                    (param.key === 'ratting' && Number(param.value) === 0)
                ) {
                    return;
                }

                if (
                    param.key === 'descPrice' &&
                    (params.has('ascPrice') || params.has('new'))
                ) {
                    params.delete('ascPrice');
                    params.delete('new');
                } else if (
                    param.key === 'ascPrice' &&
                    (params.has('descPrice') || params.has('new'))
                ) {
                    params.delete('descPrice');
                    params.delete('new');
                } else if (
                    param.key === 'new' &&
                    (params.has('descPrice') || params.has('ascPrice'))
                ) {
                    params.delete('descPrice');
                    params.delete('ascPrice');
                }
                params.set(param.key, `${param.value}`);
            }
        }
        return router.push(`/products?${params}`);
    };

    const highestPrice = localStorage.getItem('highestPrice');

    const lowestPrice = localStorage.getItem('lowestPrice');

    useEffect(() => {
        setCurrentPage(1);
        handleGetProducts(true);
    }, [searchParams.toString()]);

    useEffect(() => {
        if (currentPage > 1) {
            handleGetProducts();
        }
    }, [currentPage]);

    return (
        <div className="bg-secondary w-full min-h-screen ">
            <Container classname="py-4">
                {/* FILTER */}
                <div className="flex flex-col gap-6">
                    {/* <p className="font-bold text-xl text-black/70 uppercase">
                        Chọn theo tiêu chí
                    </p> */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <RiFilterLine />
                            <p className="font-medium">Bộ lọc</p>
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                            {SORT_OPTIONS.filter(
                                (i) =>
                                    !['new', 'descPrice', 'ascPrice'].includes(
                                        i.key
                                    )
                            ).map((opt) =>
                                opt.key === 'priceRange' ||
                                opt.key === 'ratting' ? (
                                    <Popover
                                        content={
                                            opt.key === 'priceRange' ? (
                                                <Slider
                                                    min={
                                                        Number(lowestPrice) || 0
                                                    }
                                                    max={
                                                        Number(highestPrice) ||
                                                        0
                                                    }
                                                    step={100000}
                                                    disabled={
                                                        lowestPrice?.includes(
                                                            'Infinity'
                                                        ) ||
                                                        highestPrice?.includes(
                                                            'Infinity'
                                                        )
                                                    }
                                                    className="w-[200px] sm:w-[300px]"
                                                    onAfterChange={(value) => {
                                                        handleSearchParams({
                                                            ...opt,
                                                            value,
                                                        });
                                                    }}
                                                    onChange={(value) => {
                                                        setPriceMark(value);
                                                    }}
                                                />
                                            ) : (
                                                <Rate
                                                    onChange={(value) => {
                                                        handleSearchParams({
                                                            ...opt,
                                                            value,
                                                        });
                                                    }}
                                                />
                                            )
                                        }
                                        title={
                                            opt.key === 'priceRange' &&
                                            `Giá từ: ${formatCurrency(
                                                priceMark
                                                    ? priceMark
                                                    : lowestPrice?.includes(
                                                          'Infinity'
                                                      )
                                                    ? 0
                                                    : Number(lowestPrice)
                                            )}`
                                        }
                                        key={opt.key}
                                        placement="bottomLeft"
                                        trigger="click"
                                    >
                                        <Button
                                            key={opt.key}
                                            variant="ghost"
                                            size="sm"
                                            className={cn(
                                                'bg-white shadow-product-card font-medium',
                                                searchParams.has(opt.key) &&
                                                    '!bg-primary !text-white'
                                            )}
                                        >
                                            {opt.title}
                                        </Button>
                                    </Popover>
                                ) : (
                                    <Button
                                        key={opt.key}
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            'bg-white shadow-product-card font-medium',
                                            searchParams.has(opt.key) &&
                                                '!bg-primary !text-white'
                                        )}
                                        onClick={() => handleSearchParams(opt)}
                                    >
                                        {opt.title}
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <BiSort />
                            <p className="font-medium">Sắp xếp theo</p>
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                            {SORT_OPTIONS.filter((i) =>
                                ['new', 'descPrice', 'ascPrice'].includes(i.key)
                            ).map((opt) => (
                                <Button
                                    key={opt.key}
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        'bg-white shadow-product-card font-medium',
                                        searchParams.has(opt.key) &&
                                            '!bg-primary !text-white'
                                    )}
                                    onClick={() => handleSearchParams(opt)}
                                >
                                    {opt.title}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PRODUCTS */}
                <div className="w-full h-fit mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {!!products.length &&
                        products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                </div>

                {/* LOAD MORE */}
                {pagination?.hasNext && !!products.length && (
                    <div className="flex items-center justify-center pt-8">
                        <Button
                            size="sm"
                            className="bg-white hover:!bg-white py-2 px-4 shadow-product-card text-primary hover:opacity-70 p-4 w-[400px] font-medium"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => prev + 1);
                            }}
                        >
                            Xem thêm sản phẩm
                        </Button>
                    </div>
                )}
            </Container>
            {loading && <LoadingPage overlayBackground />}
        </div>
    );
};

export default ProductListCtn;
