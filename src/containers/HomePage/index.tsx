'use client';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner';
import Container from '@/components/Layout/Container';
import ProductSection from '@/components/Product/ProductSection';
import { TCategoryInfo } from '@/types/general';
import axios from 'axios';
import Image from 'next/image';
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
            {/* <Container fluid classname="-mt-4"> */}
            {/* </Container> */}
            <Container>
                <div className="flex flex-col gap-4 sm:gap-8">
                    <CategoryAndBanner categories={categories} />
                    <div
                        className="w-full px-2 pb-2 bg-black shadow-product-card rounded-2xl"
                        style={{
                            background: `url('/assets/images/banner/banner-newyear.webp') center no-repeat`,
                        }}
                    >
                        <div className="w-full aspect-w-3 aspect-h-3 flex items-center justify-center py-10 my-2">
                            <Image
                                src={
                                    '/assets/images/banner/hot-sale-cuoi-tuan-final.gif'
                                }
                                alt=""
                                fill
                                objectFit="contain"
                                objectPosition="center"
                            />
                        </div>
                        <ProductSection
                            isHotSale={true}
                            isShowHeader={false}
                            category={{} as TCategoryInfo}
                        />
                    </div>
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
