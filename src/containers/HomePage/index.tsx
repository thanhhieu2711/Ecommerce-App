'use client';
import HotProductSection from '@/components/HomePage/HotSaleProductSection';
import Container from '@/components/Layout/Container';
//import ProductSection from '@/components/Product/ProductSection';
import { TCategoryInfo } from '@/types/general';
import axios from 'axios';
import dynamic from 'next/dynamic';
import useSWRImmutable from 'swr/immutable';

const CategoryAndBanner = dynamic(
    () => import('@/components/HomePage/CategoryAndBanner')
);

const ProductSection = dynamic(
    () => import('@/components/Product/ProductSection')
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

    return (
        <div className="pt-4 pb-4 bg-secondary flex flex-col gap-10 ">
            <Container>
                <div className="flex flex-col gap-8 sm:gap-12 relative">
                    <CategoryAndBanner categories={categories} />

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
                </div>
            </Container>
        </div>
    );
}
