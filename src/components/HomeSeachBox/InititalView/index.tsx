import { TProductInfo } from '@/types/general';
import { BiTrash, BiHistory, BiSolidHot } from 'react-icons/bi';
import { Button } from '@/components/Common';
import Link from 'next/link';
import TrendingProductItem from './TrendingProductItem';
import Skeleton from 'react-loading-skeleton';
import useSearchHistory from '@/hooks/store/useSearchHistory';
import { useAppDispatch } from '@/stores';
import { openHomeSearchBoxModal } from '@/stores/reducers/modal';
import { clearSearchHistory } from '@/stores/reducers/search-history';

type Props = {
    trendingProducts: TProductInfo[];
};

const InitialView = ({ trendingProducts }: Props) => {
    const { searchHistory } = useSearchHistory();
    const dispatch = useAppDispatch();
    return (
        <div className="w-full h-full flex flex-col gap-2 p-3">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-1">
                        <p className="font-medium">Lịch sử tìm kiếm gần đây</p>
                        <BiHistory className="w-5 h-5" />
                    </div>
                    {!!searchHistory.length && (
                        <Button
                            className="flex flex-row items-center gap-1 text-black/50 hover:text-red-500  hover:font-medium !p-0"
                            theme="white"
                            variant="ghost"
                            onClick={() => dispatch(clearSearchHistory())}
                        >
                            <p className="text-sm">Xóa tất cả</p>
                            <BiTrash className="w-4 h-4" />
                        </Button>
                    )}
                </div>
                <div className="text-sm text-black/50 flex flex-col gap-2">
                    {!!searchHistory.length ? (
                        searchHistory?.map((item) => (
                            <Link
                                key={item.date}
                                href={`/products/${item.endPoint}`}
                                className="hover:underline"
                                onClick={() =>
                                    dispatch(openHomeSearchBoxModal(false))
                                }
                            >
                                - {item.searchText}
                            </Link>
                        ))
                    ) : (
                        <>
                            <p>- Chưa có lịch sử tìm kiếm nào !</p>
                            <p>* Gợi ý tìm kiếm : </p>
                            <p>- iPhone 15 Pro Max | Chính hãng VN/A</p>
                            <p>- Apple Watch Series 7 45mm | Chính hãng VN/A</p>
                        </>
                    )}
                </div>
            </div>

            {!!searchHistory.length && (
                <div className="border-b border-black/5"></div>
            )}
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-1  w-full">
                        <p className="font-medium">Xu hướng sử tìm kiếm</p>
                        <BiSolidHot className="w-5 h-5 text-red-600" />
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-1">
                    {!trendingProducts?.length
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <Skeleton
                                  key={index}
                                  direction="ltr"
                                  enableAnimation={true}
                                  height={50}
                                  className="!col-span-1 w-full xs:!w-[220px]"
                              />
                          ))
                        : trendingProducts?.map((product) => {
                              return (
                                  <TrendingProductItem
                                      key={product.id}
                                      product={product}
                                  />
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default InitialView;
