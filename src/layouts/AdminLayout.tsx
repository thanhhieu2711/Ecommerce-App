'use client';
import Header from '@/components/Admin/Header';
import Sidebar from '@/containers/Admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row">
            <div className="basis-[320px]">
                <Sidebar />
            </div>
            <div className="flex-1 flex bg-neutral-100 p-4 flex-col gap-4 ">
                <Header />
                {children}
            </div>
        </div>
    );
}
