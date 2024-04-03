import { Inter } from 'next/font/google';

const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin', 'vietnamese'],
});
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <meta
                name="title"
                content="Mua Điện Thoại Chính Hãng | Giao Hàng Nhanh | Raven Store"
            />
            <meta
                name="description"
                content="Khám phá bộ sưu tập điện thoại thông minh hàng đầu từ các thương hiệu hàng đầu tại [Raven Store]. Từ iPhone đến Samsung Galaxy, chúng tôi cung cấp một loạt các điện thoại mới nhất với giá cả phải chăng và chất lượng đảm bảo. Đặt mua ngay hôm nay và nhận ưu đãi độc quyền!"
            />
            <meta property="og:image" content="URL_hình_ảnh" />
            <body className={inter.className}>{children}</body>
        </html>
    );
}
