import { useWindowScrollPositions } from '@/hooks/useWindowScrollPosition';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    const { scrollY } = useWindowScrollPositions();
    const pathName = usePathname();
    const isAdminPage = pathName.includes('dashboard');
    return (
        <div className="root_layout">
            {isAdminPage ? (
                <main className={cn('max-w-full')}>{children}</main>
            ) : (
                <>
                    <Header isContrast={scrollY > 0} />
                    <main className={cn('max-w-full', 'pt-10')}>
                        {children}
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
}
