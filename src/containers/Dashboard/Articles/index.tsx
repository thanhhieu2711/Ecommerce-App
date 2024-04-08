'use client';
import { Button } from '@/components/Common';
import ModalCreateArticle from '@/components/Dashboard/Articles/ModalCreateArticle';
import { Input } from 'antd';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {};

const ArticleDashboardCtn = (props: Props) => {
    const [isShowModalCreate, setIsShowModalCreate] = useState(false);

    return (
        <>
            <div className="flex flex-col justify-center h-full w-full rounded-xl relative">
                <div className=" flex justify-between items-center sm:flex-row p-4  ">
                    <div className="w-fit md:w-60 ">
                        <Input
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
                            Tạo bài viết
                        </Button>
                    </div>
                    <div className="sm:hidden">
                        <Button
                            className="!bg-green-600 !text-xl flex items-center justify-center text-white font-bold w-9 h-9"
                            size="sm"
                            //  onClick={() => setIsShowModalCreate(true)}
                        >
                            +
                        </Button>
                    </div>
                </div>
            </div>
            {isShowModalCreate && (
                <ModalCreateArticle
                    onClose={() => setIsShowModalCreate(false)}
                    isShow={true}
                />
            )}
        </>
    );
};

export default ArticleDashboardCtn;
