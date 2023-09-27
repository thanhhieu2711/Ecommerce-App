'use client';
import cn from 'classnames';
import { BiSearch, BiEdit, BiTrash } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';
import ModalCreateProduct from './components/ModalCreateProduct';
import { Button, Spinner } from '@/components/Common';
import axios from 'axios';
import {
    TBrandInfo,
    TCategoryInfo,
    TPagination,
    TProductInfo,
} from '@/types/general';
import ModalUpdateProduct from './components/ModalUpdateProduct';
import ModalDelete from '@/components/Dashboard/ModalDelete';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/helper';
import Pagination from '@/components/Common/Pagination/Pagination';
import useDebounce from '@/hooks/useDebounce';
import { Input, Tooltip } from 'antd';
// import LoadingSpinner from '@/components/Common/LoadingSpinner/LoadingSpinner';

const DEFAULT_PAGINATION: TPagination = {
    pagaLimit: 8,
    pageNumber: 1,
    totalPage: 0,
    totalRecord: 0,
};
import slugify from 'slugify';

export const ProductDashboard = () => {
    const [listProduct, setListProduct] = useState<TProductInfo[]>([]);
    const [isShowModalCreate, setIsShowModalCreate] = useState<boolean>(false);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState<boolean>(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<TCategoryInfo[]>([]);
    const [listBrand, setListBrand] = useState<TBrandInfo[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<TProductInfo>(
        {} as TProductInfo
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useDebounce<string>('', 250);
    const [pagination, setPagination] =
        useState<TPagination>(DEFAULT_PAGINATION);

    const [currentPage, setCurrentPage] = useState<number>(
        DEFAULT_PAGINATION.pageNumber
    );

    async function getProducts() {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/product', {
                params: {
                    page: currentPage,
                    name: searchValue,
                    pageLimit: 8,
                },
            });

            if (data.isSuccess) {
                setListProduct(data.data);
                setPagination(data.pagination);
                return;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function getCategories() {
        try {
            const response = await axios.get('/api/categories');
            response.data.data && setListCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getBrands() {
        try {
            const response = await axios.get('/api/brands');
            response.data.data && setListBrand(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteProduct = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.delete(
                `/api/product/${selectedProduct.id}`
            );
            if (data.isSuccess) {
                toast.success(data.message);
                setIsShowModalDelete(false);
                return;
            }
            return toast.error(data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [selectedProduct.id]);

    useEffect(() => {
        getProducts();
    }, [currentPage, searchValue]);

    useEffect(() => {
        getCategories();
        getBrands();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center h-full w-full bg-white rounded-xl relative">
                <div className=" flex justify-between items-center sm:flex-row p-4  ">
                    <div className="w-fit md:w-60 ">
                        <Input
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Nhập tên sản phẩm"
                            prefix={
                                <BiSearch className="w-5 h-5 text-black/60" />
                            }
                            size="large"
                            className="text-sm"
                        />
                    </div>
                    <div className="hidden sm:!block">
                        <Button
                            className="!bg-green-600 text-sm flex items-center justify-center text-white font-medium"
                            size="sm"
                            onClick={() => setIsShowModalCreate(true)}
                        >
                            Thêm sản phẩm
                        </Button>
                    </div>
                    <div className="sm:hidden">
                        <Button
                            className="!bg-green-600 !text-xl flex items-center justify-center text-white font-bold w-9 h-9"
                            size="sm"
                            onClick={() => setIsShowModalCreate(true)}
                        >
                            +
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    {loading ? (
                        <div className="flex-1 flex flex-col justify-center items-center">
                            {/* <LoadingSpinner /> */}
                            loading...
                        </div>
                    ) : (
                        <div className="px-4 ">
                            <table className="w-full h-full " align="center">
                                <thead className="text-center">
                                    <tr>
                                        <th>Tên</th>
                                        <th className="hidden sm:table-cell">
                                            Thương hiệu
                                        </th>
                                        <th className="hidden sm:table-cell">
                                            Danh mục
                                        </th>
                                        <th className="hidden sm:table-cell">
                                            Tình trạng
                                        </th>
                                        <th className="hidden sm:table-cell">
                                            Giá Bán
                                        </th>
                                        <th>Tùy chỉnh</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full text-center relative ">
                                    {listProduct?.map((item, index) => {
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
                                                    {
                                                        listBrand.find(
                                                            (_item) =>
                                                                _item.id ===
                                                                item.brandId
                                                        )?.name
                                                    }
                                                </td>
                                                <td className=" hidden sm:!table-cell">
                                                    {
                                                        listCategory.find(
                                                            (_item) =>
                                                                _item.id ===
                                                                item.categoryId
                                                        )?.name
                                                    }
                                                </td>
                                                <td>
                                                    <p
                                                        className={cn(
                                                            'bg-red-600 py-1 px-2 w-fit mx-auto rounded-lg text-white text-sm',
                                                            item.status ===
                                                                'AVAILABLE' &&
                                                                '!bg-green-600'
                                                        )}
                                                    >
                                                        {item.status ===
                                                        'AVAILABLE'
                                                            ? 'Còn hàng'
                                                            : 'Hết hàng'}
                                                    </p>
                                                </td>
                                                <td className=" hidden sm:!table-cell">
                                                    {formatCurrency(
                                                        item.price -
                                                            item.discount *
                                                                item.price
                                                    )}
                                                </td>

                                                <td>
                                                    <div className="flex flex-row items-center justify-center gap-4">
                                                        <Tooltip title="Chỉnh sửa">
                                                            <Button
                                                                theme="white"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setSelectedProduct(
                                                                        item
                                                                    );
                                                                    setIsShowModalUpdate(
                                                                        true
                                                                    );
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
                                                                    setSelectedProduct(
                                                                        item
                                                                    );
                                                                    setIsShowModalDelete(
                                                                        true
                                                                    );
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
                    )}

                    <div className="py-4 flex flex-row justify-center">
                        {!!pagination.totalPage && (
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
                    </div>
                </div>
            </div>
            {isShowModalCreate && (
                <ModalCreateProduct
                    callback={() => getProducts()}
                    isShow={isShowModalCreate}
                    onClose={() => setIsShowModalCreate(false)}
                    listBrand={listBrand}
                    listCategory={listCategory}
                />
            )}
            {isShowModalUpdate && (
                <ModalUpdateProduct
                    callback={() => getProducts()}
                    isShow={isShowModalUpdate}
                    onClose={() => setIsShowModalUpdate(false)}
                    product={selectedProduct}
                    listBrand={listBrand}
                    listCategory={listCategory}
                />
            )}
            {isShowModalDelete && (
                <ModalDelete
                    isShow={isShowModalDelete}
                    loadingSubmit={loading}
                    onClose={() => setIsShowModalDelete(false)}
                    onOk={async () => {
                        await handleDeleteProduct();
                        await getProducts();
                    }}
                    title="Bạn có chắc muốn xóa sản phẩm này không ?"
                    subTitle="Nếu có sản phẩm sẽ bị xóa vĩnh viễn á."
                />
            )}
        </>
    );
};
