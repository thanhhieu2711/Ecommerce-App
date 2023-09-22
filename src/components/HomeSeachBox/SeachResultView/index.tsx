import { TProductInfo } from '@/types/general';
import React from 'react';
import SearchResultItem from './SearchResultItem';

type Props = {
    searchResults: TProductInfo[];
    loading?: boolean;
};

const SearchResultView = ({ searchResults }: Props) => {
    return (
        <div className="flex flex-col w-full sm:!w-[400px] h-full ">
            <p className="font-medium text-md p-2 bg-[#f3f3f3] rounded-t-lg text-black/50">
                Kết quả tìm kiếm
            </p>
            <div className="flex-1 flex flex-col gap-3 p-2 overflow-y-auto">
                {searchResults.map((product) => (
                    <SearchResultItem product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultView;
