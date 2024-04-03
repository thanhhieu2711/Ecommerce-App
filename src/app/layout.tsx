import './globals.css';
import type { Metadata } from 'next';
import RootLayoutCtn from '@/layouts/RootLayout';
import AppProviders from './app-providers';

export const metadata: Metadata = {
    title: `Mua Điện Thoại Chính Hãng | Giao Hàng Nhanh | ${process.env.NEXT_APP_NAME}`,
    description:
        'Khám phá bộ sưu tập điện thoại thông minh hàng đầu từ các thương hiệu hàng đầu tại [Raven Store]. Từ iPhone đến Samsung Galaxy, chúng tôi cung cấp một loạt các điện thoại mới nhất với giá cả phải chăng và chất lượng đảm bảo. Đặt mua ngay hôm nay và nhận ưu đãi độc quyền!',
    colorScheme: 'light',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RootLayoutCtn>
            <AppProviders>{children}</AppProviders>
        </RootLayoutCtn>
    );
}
