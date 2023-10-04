import { BiGift } from 'react-icons/bi';
import { Modal } from '../Common';
import { TbDiscountCheck } from 'react-icons/tb';

type Props = {
    isOpen: boolean;
    handleShowAndClose: (option: boolean) => void;
};

export const ModalPromotion = ({ isOpen, handleShowAndClose }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            showFooter={false}
            header={
                <div className="flex flex-row items-center gap-2">
                    <BiGift className="icon-base !w-5 !h-5" />
                    <p className="font-semibold text-sm">
                        Chương trình khuyến mãi
                    </p>
                </div>
            }
            onClose={() => handleShowAndClose(false)}
            contentContainerClassname="!py-4"
        >
            <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-2">
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
                                Mua nhiều giảm sâu, giảm đến 200.000đ khi mua
                                phụ kiện
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                            <p className="text-sm">
                                Giảm thêm 200.000đ khi mua kèm gói bảo hành VIP
                                tại cửa hàng
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                            <p className="text-sm">
                                Giảm thêm 500.000đ khi mua kèm gói Microsoft
                                Office 365 Personal
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
                                Giảm thêm tới 10% cho thành viên VIP (áp dụng
                                tùy sản phẩm)
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                            <p className="text-sm">
                                Nhập mã{' '}
                                <span className="text-sm font-bold">
                                    “TUUTRUONG”
                                </span>{' '}
                                Giảm 5% khi đăng ký gói ELSA PRO từ 6 tháng trở
                                lên
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalPromotion;
