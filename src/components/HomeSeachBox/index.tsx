import { useEffect, useState } from 'react';
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

type Props = {};
const HomeSeachBox = (props: Props) => {
    const [searchValue, setSearchValue] = useDebounce('', 250);
    const [searchResults, setSearchResults] = useState<TProductInfo[]>([]);
    const [trendingProducts, setTrendingProduct] = useState<TProductInfo[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getProducts = async () => {
        setLoading(true);
        try {
            if (searchValue.trim() === '') {
                setSearchResults([]);
                setLoading(false);

                return;
            }
            const { data } = await axios.get('/api/product', {
                params: {
                    name: searchValue,
                },
            });
            if (data.isSuccess) {
                console.log(data.data);
                setSearchResults(data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getTrendingProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/trending');
            if (data.isSucess) {
                setTrendingProduct(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [searchValue]);

    useEffect(() => {
        getTrendingProducts();
    }, []);

    return (
        <div className="sm:w-[320px] z-10 shadow-sm rounded-full">
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
                placeholder="Bạn cần tìm gì nào ?"
                className={cn(
                    'border-none bg-secondary rounded-full ring-0 text-sm z-[20] hover:cursor-pointer ',
                    showModal && '!bg-white '
                )}
                aria-placeholder="text-black/20"
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowModal(true)}
                styles={{
                    input: {
                        backgroundColor: showModal ? 'white' : '#f6f9fc',
                    },
                }}
                size="large"
            />
            <div
                onClick={(e) => {
                    setShowModal(false);
                }}
                className={cn(
                    ' transition-all duration-300 ease-out px-4',
                    showModal && 'fixed inset-0 ring-0 bg-black/20'
                )}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                        'hidden',
                        showModal &&
                            '!block absolute top-20 inset-x-6 sm:left-auto sm:right-[17.5%] sm:w-fit max-w-[500px] h-full max-h-[500px] bg-white rounded-lg shadow-md'
                    )}
                >
                    {searchResults.length <= 0 ? (
                        <InitialView trendingProducts={trendingProducts} />
                    ) : (
                        <SearchResultView searchResults={searchResults} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeSeachBox;
