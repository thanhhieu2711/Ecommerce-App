import React from 'react';
import { BiGift } from 'react-icons/bi';
import { TbDiscountCheck } from 'react-icons/tb';

type Props = {
    handleShowPromotionModal: () => void;
};

export const Promotion = ({ handleShowPromotionModal }: Props) => {
    return (
        <div className="flex flex-row items-center sm:flex-col sm:items-start gap-2 p-4 rounded-lg border border-black/10">
            <div className="flex flex-row items-center gap-2">
                <BiGift className="icon-base !w-5 !h-5" />
                <p className="font-semibold text-sm">Chương trình khuyến mãi</p>
            </div>
            <div className="hidden sm:flex flex-col gap-2 pl-7">
                <div className="flex flex-col gap-2">
                    <p className="text-red-600 text-sm font-semibold">
                        Ưu đãi sinh viên
                    </p>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Giảm 200.000đ cho khách hàng là HS-SV
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Thi tốt quà to - Đỗ cao giảm khủng đến 500.000đ
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-red-600 text-sm font-semibold">
                        Ưu đãi mua kèm
                    </p>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Mua nhiều giảm sâu, giảm đến 200.000đ khi mua phụ
                            kiện
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Giảm thêm 200.000đ khi mua kèm gói bảo hành VIP tại
                            cửa hàng
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Giảm thêm 500.000đ khi mua kèm gói Microsoft Office
                            365 Personal
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-red-600 text-sm font-semibold">
                        Ưu đãi thêm
                    </p>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Giảm thêm tới 10% cho thành viên VIP (áp dụng tùy
                            sản phẩm)
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                        <p className="text-sm">
                            Nhập mã{' '}
                            <span className="text-sm font-bold">
                                “TUUTRUONG”
                            </span>{' '}
                            Giảm 5% khi đăng ký gói ELSA PRO từ 6 tháng trở lên
                        </p>
                    </div>
                </div>
            </div>
            <p
                className="sm:hidden ml-auto text-sm text-secondary-variant-2 underline cursor-pointer"
                onClick={() => handleShowPromotionModal()}
            >
                Chi tiết
            </p>
        </div>
    );
};

export default Promotion;
