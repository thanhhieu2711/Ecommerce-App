import React from 'react';
import Container from './Container';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { Input } from 'antd';
type Props = {};

export default function Footer(props: Props) {
    return (
        <footer className="max-w-full h-full border-t border-black/5">
            <Container>
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 py-10 gap-20">
                    <div className="col-span-1">
                        <Link href={'/'}>
                            <p className="text-2xl font-bold text-primary">
                                RAVEN STORE
                            </p>
                        </Link>
                        <div className="flex flex-col gap-4 mt-5 text-sm text-black/50">
                            <p>
                                Giấy phép ĐKKD: 0307185382 do Sở KH-ĐT TP.HCM
                                cấp ngày 04/02/2009
                            </p>
                            <p>
                                Nhà phân phối độc quyền các thương hiệu Apple -
                                Samsung - Lenovo - Asus - Thinkpad - ROG -
                                Xiaomi - Gigabyte - Dell - LG - Microsoft - Oppo
                                - Sony - Marshall
                            </p>
                            <div className="flex items-center gap-10 text-black">
                                <FaFacebook className="icon-base hover:cursor-pointer" />
                                <FaInstagram className="icon-base hover:cursor-pointer" />
                                <FaYoutube className="icon-base hover:cursor-pointer" />
                                <FaTiktok className="icon-base hover:cursor-pointer" />
                            </div>
                            <p className="mt-5">© 2024, Raven Store.</p>
                        </div>
                    </div>
                    <div className="col-span-1 hidden md:block">
                        <p className="text-md font-semibold ">
                            Thông tin liên hệ
                        </p>

                        <div className="flex flex-col gap-4 mt-5 text-sm text-black/50">
                            <p>
                                97 Dũng Sĩ Thanh Khê, P.Thanh Khê Tây, Q.Thanh
                                Khê, TP.Đà Nẵng
                            </p>
                            <p>
                                Giờ làm việc: 8:30 sáng - 8:00 tối các ngày
                                trong tuần
                            </p>
                            <p>(028)6.292.1182 - 0904.135.321 - 0899.454.393</p>
                        </div>
                    </div>
                    <div className="col-span-1 hidden md:block">
                        <p className="text-xl font-semibold ">
                            Nhận tin khuyến mãi
                        </p>
                        <Input
                            className="h-10 mt-5  focus:!ring-transparent focus:!outline-none"
                            placeholder="Nhập email của bạn tại đây!"
                            type="email"
                        />
                    </div>
                    <div className="col-span-1 hidden md:block">
                        <p className="text-md font-semibold ">
                            Thông tin chính sách
                        </p>
                        <div className="flex flex-col gap-4 mt-5 text-sm text-black/50 ">
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Trả góp 0%
                            </p>
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Mua trước trả sau - PayLater
                            </p>
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Chính sách bảo hành
                            </p>
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Chính sách vận chuyển
                            </p>
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Chính sách hoàn tiền
                            </p>
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Điều khoản dịch vụ
                            </p>
                            <p className="hover:cursor-pointer hover:text-black/80">
                                Chính sách bảo mật
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
