'use client';
import Container from './Container';
import { BiCart, BiHeart } from 'react-icons/bi';
import Link from 'next/link';
import cn from 'classnames';
import UserMenu from '../UserMenu';
import HomeSeachBox from '../HomeSeachBox';
import { useAppDispatch } from '@/stores';
import { openCartDrawer, openWishlistDrawer } from '@/stores/reducers/drawer';
import CartDrawer from '../CartDrawer';
import WishlistDrawer from '../WishlistDrawer';
import { useCart, useDrawer, useWishlist } from '@/hooks/store';
import { useWindowScrollPositions } from '@/hooks/useWindowScrollPosition';

export default function Header() {
    const dispatch = useAppDispatch();
    const { listCart, cartQuantity } = useCart();
    const { wishList, wishListQuantity } = useWishlist();
    const { isOpenCartDrawer, isOpenWishlistDrawer } = useDrawer();
    const { scrollY } = useWindowScrollPositions();
    return (
        <header
            className={cn(
                'max-w-full border-b border-black/5 bg-white fixed inset-x-0 top-0 transition-all duration-100 ease-out z-30',
                scrollY > 0 && 'shadow-product-card'
            )}
        >
            <Container>
                <div className="flex flex-row items-center gap-2 sm:gap-0 sm:justify-between py-2 xs:py-5 max-w-full ">
                    <Link
                        href={'/'}
                        className={cn('font-bold text-3xl text-primary font ')}
                    >
                        RAVEN
                    </Link>
                    <div
                        className={cn(
                            'flex-1 sm:flex-initial flex flex-row items-center gap-2 sm:gap-4 md:justify-between -mr-4',
                            (isOpenCartDrawer || isOpenWishlistDrawer) &&
                                '!-mr-4'
                        )}
                    >
                        <HomeSeachBox />
                        <div
                            className={cn('flex flex-row items-center gap-4 ')}
                        >
                            <Link
                                href={''}
                                className="hidden sm:block relative p-2 bg-secondary rounded-full hover:text-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(openWishlistDrawer(true));
                                }}
                            >
                                <BiHeart className={cn('icon-base ')} />
                                {!!wishList.length && (
                                    <div className="absolute w-5 h-5 flex flex-row items-center justify-center bg-red-600 rounded-full top-3 -translate-y-full -right-2 text-xs text-white">
                                        {wishList.length}
                                    </div>
                                )}
                            </Link>
                            <Link
                                href={''}
                                className="hidden sm:block relative p-2 bg-secondary rounded-full hover:text-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(openCartDrawer(true));
                                }}
                            >
                                <BiCart className={cn('icon-base')} />
                                {!!listCart.length && (
                                    <div className="absolute w-5 h-5 flex flex-row items-center justify-center bg-red-600 rounded-full top-3 -translate-y-full -right-2 text-xs text-white">
                                        {cartQuantity}
                                    </div>
                                )}
                            </Link>
                            <UserMenu
                                cartQuantity={cartQuantity}
                                wishlistQuantity={wishListQuantity}
                            />
                            <div>
                                <CartDrawer />
                                <WishlistDrawer />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
