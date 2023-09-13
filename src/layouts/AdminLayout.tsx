import Header from '@/components/Layout/Dashboard/Header';
import Sidebar from '@/components/Layout/Dashboard/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row max-w-[100vw]">
            <div className="sm:basis-[320px]">
                <Sidebar />
            </div>
            <div className="flex-1 flex bg-neutral-100 p-4 flex-col gap-4">
                <Header />
                {children}
            </div>
        </div>
    );
}
