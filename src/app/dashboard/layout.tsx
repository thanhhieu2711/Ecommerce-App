import { Toast } from '@/components/Common';
// import LoadingPage from '@/components/Common/LoadingPage';
import AdminLayout from '@/layouts/AdminLayout';
// import { Suspense, useMemo } from 'react';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminLayout>
            {/* <Suspense fallback={<LoadingPage />}>{children}</Suspense> */}
            {children}
            <Toast />
        </AdminLayout>
    );
}
