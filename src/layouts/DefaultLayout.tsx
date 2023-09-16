import { useWindowScrollPositions } from '@/hooks/useWindowScrollPosition';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import useUser from '@/hooks/store/useUser';

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    const { scrollY } = useWindowScrollPositions();
    const { currentUser } = useUser();

    return (
        <div className="root_layout">
            {/* <TopHeader /> */}
            <Header isContrast={scrollY > 0} />
            <main className="max-w-full pt-20">{children}</main>
            <Footer />
        </div>
    );
}
