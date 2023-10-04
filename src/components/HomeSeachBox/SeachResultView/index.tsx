import { TProductInfo } from '@/types/general';
import React from 'react';
import SearchResultItem from './SearchResultItem';

type Props = {
    searchResults: TProductInfo[];
    loading?: boolean;
    setSearchValue: (text: string) => void;
};

const SearchResultView = ({ searchResults, setSearchValue }: Props) => {
    return (
        <div className="flex flex-col w-full sm:!w-[400px] h-full ">
            <p className="text-sm p-2 bg-[#f3f3f3] rounded-t-lg text-black/50">
                Kết quả tìm kiếm
                <span className=""> ({searchResults.length})</span>
            </p>
            <div className="flex-1 flex flex-col gap-3 p-2 overflow-y-auto">
                {searchResults.map((product) => (
                    <div key={product.id} onClick={() => setSearchValue('')}>
                        <SearchResultItem product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResultView;
