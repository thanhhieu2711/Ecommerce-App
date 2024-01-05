'use client';
import CategoryAndBanner from '@/components/HomePage/CategoryAndBanner';
import Container from '@/components/Layout/Container';
import ProductSection from '@/components/Product/ProductSection';
import { TCategoryInfo } from '@/types/general';
import axios from 'axios';
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
        <div className="pt-4 pb-4 bg-secondary">
            <Container>
                <div className="flex flex-col gap-4 sm:gap-8">
                    <CategoryAndBanner categories={categories} />
                    {categories?.slice(0, 4).map((item) => (
                        <ProductSection key={item.id} category={item} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
