import Banner from './components/Banner';
import { TCategoryInfo } from '@/types/general';
import CategorySection from './components/CategorySection';

type Props = {
    categories: TCategoryInfo[];
};

export const CategoryAndBanner = ({ categories }: Props) => {
    return (
        <div className="w-full h-full flex flex-col gap-8">
            <Banner />
            <CategorySection categories={categories} />
        </div>
    );
};
export default CategoryAndBanner;
