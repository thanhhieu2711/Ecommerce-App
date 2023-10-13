import { useWindowScrollPositions } from '@/hooks/useWindowScrollPosition';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import RegisterModal from '@/containers/Auth/RegisterModal';
import LoginModal from '@/containers/Auth/LoginModal';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    const pathName = usePathname();
    const isAdminPage = pathName.includes('dashboard');

    return (
        <div className="">
            {isAdminPage ? (
                <main className={cn('max-w-full')}>{children}</main>
            ) : (
                <>
                    <Header />
                    <main className={cn('max-w-full pt-20')}>{children}</main>
                    <RegisterModal />
                    <LoginModal />
                    <Footer />
                </>
            )}
        </div>
    );
}
