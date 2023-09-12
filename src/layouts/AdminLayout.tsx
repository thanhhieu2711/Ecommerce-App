import Container from '@/components/Layout/Container';
import Sidebar from '@/containers/Admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row">
            <div className="basis-[320px] ">
                <Sidebar />
            </div>
            <div className="flex-1 bg-neutral-100">{children}</div>
        </div>
    );
}
