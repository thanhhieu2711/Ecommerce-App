import { TCategoryInfo } from '@/types/general';
import React from 'react';
import CategoryCard from './CategoryCard';
import Skeleton from 'react-loading-skeleton';

type Props = {
    categories: TCategoryInfo[];
};

const CategorySection = ({ categories = [] }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-6 ">
            <p className="w-fit text-lg font-bold sm:text-2xl uppercase">
                {/* relative after:absolute after:left-0 after:right-0 after:h-1 after:-bottom-1 after:bg-primary  */}
                Danh mục nổi bật
            </p>
            <div className="bg-white rounded-2xl shadow-card p-4 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 xl:grid-cols-10 gap-2">
                {!!categories?.length
                    ? categories.map((item) => {
                          return <CategoryCard category={item} key={item.id} />;
                      })
                    : Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="flex flex-col gap-2 px-2">
                              <Skeleton
                                  enableAnimation
                                  height={80}
                                  direction="ltr"
                                  duration={1.5}
                                  className="!rounded-lg "
                              />
                              <Skeleton
                                  enableAnimation
                                  direction="ltr"
                                  duration={1.5}
                                  className="!rounded-lg "
                              />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default CategorySection;
