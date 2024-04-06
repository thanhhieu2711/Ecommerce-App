import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import RegisterModal from '@/containers/Auth/RegisterModal';
import LoginModal from '@/containers/Auth/LoginModal';

type Props = {
    children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
    const pathName = usePathname();
    const isAdminPage = pathName.includes('dashboard');
    const isPaymentPageFlow = pathName.includes('payment');
    const isProductsPage =
        pathName.includes('products') && pathName.endsWith('products');
    return (
        <div className="">
            {isAdminPage ? (
                <main className={cn('max-w-full')}>{children}</main>
            ) : (
                <>
                    <Header />
                    <main className={cn('max-w-full h-full pt-14 xs:pt-20')}>
                        {children}
                    </main>
                    {!isPaymentPageFlow && <Footer />}
                    <RegisterModal />
                    <LoginModal />
                </>
            )}
        </div>
    );
}
