'use client';
import Input from '@/components/Common/Input';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import { Button } from '@/components/Common';
import ModalCreateBrand from './components/ModalCreateBrand';

type Props = {};

export const BrandDashboard = (props: Props) => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    return (
        <>
            <div className="h-full w-full bg-white rounded-lg">
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
                        className="!bg-green-600 text-sm flex items-center justify-center text-white"
                        size="md"
                        onClick={() => setIsShowModal(true)}
                    >
                        Thêm danh mục
                    </Button>
                </div>
            </div>
            <ModalCreateBrand
                isShow={isShowModal}
                onClose={() => setIsShowModal(false)}
            />
        </>
    );
};

export default BrandDashboard;
