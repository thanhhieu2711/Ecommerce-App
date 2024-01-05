import { useCallback, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Input from 'antd/es/input/Input';
import useDebounce from '@/hooks/useDebounce';
import { TProductInfo } from '@/types/general';
import cn from 'classnames';
import axios from 'axios';
import InitialView from './InititalView';
import SearchResultView from './SeachResultView';
import { Spinner } from '../Common';
import 'react-loading-skeleton/dist/skeleton.css';
import useModal from '@/hooks/store/useModal';
import { useAppDispatch } from '@/stores';
import { openHomeSearchBoxModal } from '@/stores/reducers/modal';
import { debounce } from 'lodash';
import useSWRImmutable from 'swr/immutable';
type Props = {};
const HomeSeachBox = (props: Props) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchParams, setSearchParams] = useDebounce<string>('', 200);
    const [searchResults, setSearchResults] = useState<TProductInfo[]>([]);
    // const [trendingProducts, setTrendingProduct] = useState<TProductInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { isOpenHomeSearchBoxModal } = useModal();

    const getProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/products/filter', {
                params: {
                    name: searchParams,
                },
            });
            data.isSuccess && setSearchResults(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getTrendingProducts = async (url: string) => {
        try {
            const { data } = await axios.get(url);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const { data: trendingProducts }: { data: TProductInfo[] } =
        useSWRImmutable('/api/products/trending', getTrendingProducts);

    useEffect(() => {
        if (searchParams.trim() !== '') {
            getProducts();
        } else {
            setSearchResults([]);
        }
    }, [searchParams]);

    return (
        <div className="w-full sm:w-[350px] z-10 shadow-sm rounded-full">
            <Input
                onClick={(e) => e.stopPropagation()}
                suffix={
                    loading ? (
                        <Spinner
                            classname="m-[2px]"
                            fillActive="fill-black/30"
                        />
                    ) : (
                        <BiSearch className=" icon-base ml-px" />
                    )
                }
                value={searchValue}
                placeholder="Bạn cần tìm gì nào ?"
                className={cn(
                    'border-none bg-secondary rounded-full ring-0 text-sm z-[20] hover:cursor-pointer ',
                    isOpenHomeSearchBoxModal && '!bg-white '
                )}
                aria-placeholder="text-black/20"
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    setSearchParams(e.target.value);
                }}
                onFocus={() => dispatch(openHomeSearchBoxModal(true))}
                styles={{
                    input: {
                        backgroundColor: isOpenHomeSearchBoxModal
                            ? 'white'
                            : '#f6f9fc',
                    },
                }}
                size="large"
            />
            <div
                onClick={(e) => {
                    dispatch(openHomeSearchBoxModal(false));
                }}
                className={cn(
                    ' transition-all duration-[250ms] ease-out px-4 opacity-0',
                    isOpenHomeSearchBoxModal &&
                        'fixed inset-0 ring-0 bg-black/50 !opacity-100'
                )}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                        'hidden',
                        isOpenHomeSearchBoxModal &&
                            '!block absolute top-20 inset-x-4 sm:left-auto sm:right-[20%] xl:right-[20%] sm:w-fit max-w-[500px] h-full max-h-[500px] bg-white rounded-lg shadow-md'
                    )}
                >
                    {!searchResults.length || searchValue.trim() === '' ? (
                        <InitialView trendingProducts={trendingProducts} />
                    ) : (
                        <SearchResultView
                            setSearchValue={setSearchValue}
                            searchResults={searchResults}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeSeachBox;
