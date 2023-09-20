'use client';
import Input from '@/components/Common/Input';
import { BiSearch } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';
import ModalCreateProduct from './components/ModalCreateProduct';
import { Button } from '@/components/Common';
import axios from 'axios';
import { TBrandInfo, TCategoryInfo, TProductInfo } from '@/types/general';
import ModalUpdateProduct from './components/ModalUpdateProduct';
import ModalDelete from '@/components/Dashboard/ModalDelete';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/helper';

async function getProducts() {
    const res = await axios.get<TProductInfo[]>('/api/products');
    return res.data;
}

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

    // const listProduct = await getProducts();

    async function getProducts() {
        const { data } = await axios.get('/api/products');
        data.isSuccess && setListProduct(data.data);
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
        console.log('call');
        const { data } = await axios.delete(
            `/api/products/${selectedProduct.id}`
        );
        if (data.isSuccess) {
            toast.success(data.message);
            setIsShowModalDelete(false);
            return;
        }
        return toast.error(data.message);
    }, [selectedProduct.id]);

    useEffect(() => {
        getProducts();
        getCategories();
        getBrands();
    }, []);

    return (
        <>
            <div className="flex flex-col h-full w-full bg-white rounded-lg">
                <div className=" flex sm:justify-between items-center sm:flex-row p-6 flex-col justify-start">
                    <div className="w-fit md:w-60 ">
                        <Input
                            onChange={() => {}}
                            placeholder="Nhập thông tin sản phẩm"
                            prefixIcon={
                                <BiSearch className="w-5 h-5 text-black/60" />
                            }
                        />
                    </div>
                    <Button
                        className="!bg-green-600 text-sm flex items-center justify-center text-white text-sm font-medium"
                        size="md"
                        onClick={() => setIsShowModalCreate(true)}
                    >
                        Thêm sản phẩm
                    </Button>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <table className="w-full" align="center">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Thương hiệu</th>
                                    <th>Danh mục</th>
                                    <th>Số lượng</th>
                                    <th>Giá tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Tùy chỉnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct?.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="w-[200px]">
                                                <p className="line-clamp-1">
                                                    {item.name}
                                                </p>
                                            </td>
                                            <td>{item.brandId}</td>
                                            <td>Data 3</td>
                                            <td>Data 3</td>
                                            <td>
                                                {formatCurrency(item.price)}
                                            </td>
                                            <td>Data 3</td>
                                            <td className="w-[150px]">
                                                <div
                                                    className="flex flex-row items-center gap-2 "
                                                    onClick={() => {
                                                        setSelectedProduct(
                                                            item
                                                        );
                                                        setIsShowModalUpdate(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    edit
                                                </div>
                                                <div
                                                    className="flex flex-row items-center gap-2 "
                                                    onClick={() => {
                                                        setSelectedProduct(
                                                            item
                                                        );
                                                        setIsShowModalDelete(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    delete
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="py-4 flex flex-row justify-center">
                        pagination
                    </div>
                </div>
            </div>
            {isShowModalCreate && (
                <ModalCreateProduct
                    isShow={isShowModalCreate}
                    onClose={() => setIsShowModalCreate(false)}
                    listBrand={listBrand}
                    listCategory={listCategory}
                />
            )}
            {isShowModalUpdate && (
                <ModalUpdateProduct
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
                    onClose={() => setIsShowModalDelete(false)}
                    onOk={() => handleDeleteProduct()}
                    title="Bạn có chắc muốn xóa sản phẩm này không ?"
                    subTitle="Nếu có sản phẩm sẽ bị xóa vĩnh viễn á."
                />
            )}
        </>
    );
};
