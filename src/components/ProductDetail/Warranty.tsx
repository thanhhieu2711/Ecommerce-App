import { TbDiscountCheck } from 'react-icons/tb';
import { BiInfoCircle } from 'react-icons/bi';

export const Warranty = () => {
    return (
        <div className="w-full flex flex-col p-4 gap-2 border border-black/10 rounded-lg">
            <div className="flex items-center gap-2">
                <BiInfoCircle className="icon-base !w-5 !h-5" />
                <p className="font-semibold text-sm">Thông tin sản phẩm</p>
            </div>
            <div className="flex flex-col pl-7 text-sm gap-1">
                <div className="flex flex-row gap-2">
                    <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                    <p>
                        Mới đầy đủ phụ kiện từ nhà sản xuất, 1 đổi 1 trong vòng
                        15 ngày
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                    <p>
                        Bảo hành chính hãng 2 năm, remote 1 năm và bảo hành tại
                        nhà
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                    <p className="font-semibold text-red-600">
                        Giá sản phẩm đã bao gồm VAT
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Warranty;
