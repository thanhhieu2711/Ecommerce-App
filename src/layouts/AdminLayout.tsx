import Header from '@/components/Layout/Dashboard/Header';
import Sidebar from '@/components/Layout/Dashboard/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row max-w-[100vw] h-screen max-h-screen bg-secondary p-6 gap-4">
            <div className="basis-[60px] sm:basis-[200px] md:basis-[300px] h-full bg-white rounded-xl">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <Header />
                <div className="flex flex-1 bg-white rounded-lg shadow-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
