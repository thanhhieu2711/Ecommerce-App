import CategoryList from './components/CategoryList';
import Banner from './components/Banner';
import Image from 'next/image';
import { bannerList } from '@/utils/constants/general';

export const CategoryAndBanner = () => {
    return (
        <div className="w-full h-full flex flex-col gap-8">
            <div className="w-full grid grid-cols-4 gap-4 row-auto ">
                <CategoryList />
                <Banner />
            </div>
            <div className="hidden sm:flex flex-row items-center gap-4">
                {bannerList
                    .filter((banner) => banner.type === 'sub')
                    .map((banner) => (
                        <div className="flex-1 h-full " key={banner.id}>
                            <img
                                alt="banner"
                                src={banner.path}
                                width={'100%'}
                                height={'100%'}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default CategoryAndBanner;
