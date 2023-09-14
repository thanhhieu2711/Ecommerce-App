import { Toast } from '@/components/Common';
import AdminLayout from '@/layouts/AdminLayout';
import { Suspense } from 'react';
import Loading from '@/app/dashboard/loading';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminLayout>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toast />
        </AdminLayout>
    );
}
