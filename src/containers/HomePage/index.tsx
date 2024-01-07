'use client';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner';
import CategorySection from '@/components/HomePage/CategorySection';
import HotProductSection from '@/components/HomePage/HotProductSection';
import Container from '@/components/Layout/Container';
import ProductSection from '@/components/Product/ProductSection';
import { TCategoryInfo } from '@/types/general';
import axios from 'axios';
import Image from 'next/image';
import { FaSignHanging } from 'react-icons/fa6';
import useSWRImmutable from 'swr/immutable';

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
        <div className="pt-4 pb-4 bg-secondary flex flex-col gap-10">
            <Container>
                <div className="flex flex-col gap-8 sm:gap-12">
                    <CategoryAndBanner categories={categories} />
                    {categories && <CategorySection categories={categories} />}
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
