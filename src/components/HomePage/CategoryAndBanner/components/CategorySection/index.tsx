import { TCategoryInfo } from '@/types/general';
import React from 'react';
import CategoryCard from './CategoryCard';

type Props = {
    categories: TCategoryInfo[];
};

const CategorySection = ({ categories }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-6 ">
            <p className="w-fit text-xl font-semibold sm:text-2xl relative uppercase after:absolute after:left-0 after:right-0 after:h-1 after:-bottom-1 after:bg-primary-variant-1 ">
                Danh mục
            </p>
            <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 xl:grid-cols-10 gap-2">
                {categories?.map((item) => {
                    return <CategoryCard category={item} key={item.id} />;
                })}
            </div>
        </div>
    );
};

export default CategorySection;
