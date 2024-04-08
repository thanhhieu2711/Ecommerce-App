import Header from '@/components/Layout/Dashboard/Header';
import Sidebar from '@/components/Layout/Dashboard/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row max-w-[100vw] h-screen max-h-screen bg-secondary ">
            <div className="basis-[60px] sm:basis-[200px] md:basis-[300px] h-full bg-white border-r border-r-black/5">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex flex-1 bg-primary/5 ">{children}</div>
            </div>
        </div>
    );
}
