'use client';
import { BiEdit, BiSearch, BiTrash } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Common';
import ModalCreateCategory from './components/ModalCreateCategory';
import axios from 'axios';
import { TCategoryInfo, TPagination } from '@/types/general';
import cn from 'classnames';
import Pagination from '@/components/Common/Pagination/Pagination';
import { formatDate } from '@/utils/helper';
import { Input, Tooltip } from 'antd';
import Image from 'next/image';
import useDebounce from '@/hooks/useDebounce';
import { DEFAULT_PAGINATION } from '@/utils/constants/general';
type Props = {};

export const CategoryDashboard = (props: Props) => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [categories, setCategories] = useState<TCategoryInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useDebounce<string>('', 250);
    const [pagination, setPagination] =
        useState<TPagination>(DEFAULT_PAGINATION);
    const [currentPage, setCurrentPage] = useState<number>(
        DEFAULT_PAGINATION.pageNumber
    );

    async function getCategories() {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/categories/filter', {
                params: {
                    page: currentPage,
                    name: searchValue,
                    pageLimit: 8,
                },
            });
            if (data.data) {
                setCategories(data.data);
                setPagination(data.pagination);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [currentPage, searchValue]);

    return (
        <>
            <div className="h-full w-full flex flex-col bg-white rounded-lg">
                <div className=" flex sm:justify-between items-center sm:flex-row p-6 flex-col justify-start">
                    <div className="w-fit md:w-60 ">
                        <Input
                            onChange={(e) => {
                                setCurrentPage(1);
                                setSearchValue(e.target.value);
                            }}
                            placeholder="Nhập tên sản phẩm"
                            prefix={
                                <BiSearch className="w-5 h-5 text-black/60" />
                            }
                            size="large"
                            className="text-sm"
                        />
                    </div>
                    <Button
                        className="!bg-green-600 text-sm flex items-center justify-center text-white"
                        size="md"
                        onClick={() => setIsShowModal(true)}
                    >
                        Thêm danh mục
                    </Button>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    {loading ? (
                        <div className="flex-1 flex flex-col justify-center items-center">
                            {/* <LoadingSpinner /> */}
                            loading...
                        </div>
                    ) : !!categories.length ? (
                        <div className="px-4 ">
                            <table className="w-full h-full " align="center">
                                <thead className="text-center">
                                    <tr>
                                        <th>Tên</th>
                                        <th className="hidden sm:table-cell">
                                            Hình ảnh
                                        </th>
                                        <th className="hidden sm:table-cell">
                                            Ngày tạo
                                        </th>
                                        <th className="hidden sm:table-cell">
                                            Ngày cập nhật
                                        </th>
                                        <th>Tùy chỉnh</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full text-center relative ">
                                    {categories?.map((item, index) => {
                                        return (
                                            <tr
                                                key={item.id}
                                                className={cn(
                                                    'w-full h-[55px] even:bg-neutral-100'
                                                )}
                                            >
                                                <td className="w-[200px] ">
                                                    <p className="line-clamp-1">
                                                        {item.name}
                                                    </p>
                                                </td>
                                                <td className=" hidden sm:!table-cell">
                                                    <div className="flex items-center justify-center">
                                                        <Image
                                                            src={item.thumbnail}
                                                            alt="thumnail"
                                                            width={50}
                                                            height={50}
                                                            objectFit="contain"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </td>
                                                <td className=" hidden sm:!table-cell">
                                                    <p className="line-clamp-1">
                                                        {formatDate(
                                                            item.createdAt
                                                        )}
                                                    </p>
                                                </td>

                                                <td className=" hidden sm:!table-cell">
                                                    <p className="line-clamp-1">
                                                        {formatDate(
                                                            item.updatedAt
                                                        )}
                                                    </p>
                                                </td>

                                                <td>
                                                    <div className="flex flex-row items-center justify-center gap-4">
                                                        <Tooltip title="Chỉnh sửa">
                                                            <Button
                                                                theme="white"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    // setSelectedProduct(
                                                                    //     item
                                                                    // );
                                                                    // setIsShowModalUpdate(
                                                                    //     true
                                                                    // );
                                                                }}
                                                            >
                                                                <BiEdit />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Xóa">
                                                            <Button
                                                                theme="white"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    // setSelectedProduct(
                                                                    //     item
                                                                    // );
                                                                    // setIsShowModalDelete(
                                                                    //     true
                                                                    // );
                                                                }}
                                                            >
                                                                <BiTrash />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Không tìm thấy danh mục nào !!</p>
                    )}
                    {/* <div className="py-4 flex flex-row justify-center">
                        {!!pagination.totalPage && !loading && (
                            <Pagination
                                currentPage={currentPage}
                                totalPage={pagination.totalPage}
                                onNextButton={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                onPageChange={(currentPage) =>
                                    setCurrentPage(currentPage)
                                }
                                onPrevButton={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                            />
                        )}
                    </div> */}
                </div>
            </div>

            <ModalCreateCategory
                isShow={isShowModal}
                onClose={() => setIsShowModal(false)}
            />
        </>
    );
};

export default CategoryDashboard;
