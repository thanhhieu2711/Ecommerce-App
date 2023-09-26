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
            <body className={inter.className}>{children}</body>
        </html>
    );
}
