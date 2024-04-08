'use client';
import Container from '@/components/Layout/Container';
import { TArticleInfo, TBrandInfo, TCategoryInfo } from '@/types/general';
import axios from 'axios';
import dynamic from 'next/dynamic';
import useSWRImmutable from 'swr/immutable';

const CategoryAndBanner = dynamic(
    () => import('@/components/HomePage/CategoryAndBanner')
);

const BrandSection = dynamic(
    () => import('@/components/HomePage/BrandSection')
);

const ProductSection = dynamic(
    () => import('@/components/Product/ProductSection')
);

const HotProductSection = dynamic(
    () => import('@/components/HomePage/HotSaleProductSection')
);

const DiscountPromotionSection = dynamic(
    () => import('@/components/HomePage/DiscountPromotion')
);

const ArticleSection = dynamic(
    () => import('@/components/HomePage/ArticleSection')
);

type Props = {};

export default function HomePageContainer(props: Props) {
    const getCategories = async (url: string) => {
        const { data } = await axios.get(url);
        return data.data;
    };
    const { data: categories }: { data: TCategoryInfo[] } = useSWRImmutable(
        '/api/categories',
        getCategories
    );

    const getBrands = async (url: string) => {
        const { data } = await axios.get(url);
        return data.data;
    };
    const { data: brands }: { data: TBrandInfo[] } = useSWRImmutable(
        '/api/brands',
        getBrands
    );

    const getArticles = async (url: string) => {
        const { data } = await axios.get(url);
        return data.data;
    };
    const { data: articles }: { data: TArticleInfo[] } = useSWRImmutable(
        '/api/articles',
        getArticles
    );

    return (
        <div className="pt-4 pb-4 bg-white flex flex-col gap-10 ">
            <Container>
                <div className="flex flex-col gap-8 sm:gap-12 relative">
                    <CategoryAndBanner categories={categories} />

                    <BrandSection brands={brands} />

                    <HotProductSection />

                    {!!categories?.length
                        ? categories
                              ?.slice(0, 5)
                              .map((item) => (
                                  <ProductSection
                                      key={item.id}
                                      category={item}
                                  />
                              ))
                        : Array.from({ length: 4 }).map((_, index) => (
                              <ProductSection
                                  key={index}
                                  category={{} as TCategoryInfo}
                              />
                          ))}

                    <DiscountPromotionSection />

                    <ArticleSection articles={articles} />
                </div>
            </Container>
        </div>
    );
}
