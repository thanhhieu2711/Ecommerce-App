'use client';
import Container from './Container';
import { BiCart, BiHeart } from 'react-icons/bi';
import Link from 'next/link';
import cn from 'classnames';
import UserMenu from '../UserMenu';
import HomeSeachBox from '../HomeSeachBox';
import useDrawer from '@/hooks/store/useDrawer';
import { useAppDispatch } from '@/stores';
import { openCartDrawer, openWishlistDrawer } from '@/stores/reducers/drawer';
import CartDrawer from '../CartDrawer';
import WishlistDrawer from '../WishlistDrawer';

type Props = {
    isContrast: boolean;
};

export default function Header({ isContrast }: Props) {
    const { isOpenCartDrawer, isOpenWishlistDrawer } = useDrawer();
    const dispatch = useAppDispatch();

    return (
        <header
            className={cn(
                'max-w-full border-b border-black/10 bg-white fixed inset-x-0 top-0 transition-all duration-300 ease-out',
                isContrast && '!bg-black shadow-lg '
            )}
        >
            <Container>
                <div className="flex flex-row items-center justify-between py-5 max-w-full ">
                    <p
                        className={cn(
                            'font-bold text-3xl ',
                            isContrast && 'text-white'
                        )}
                    >
                        LOGO
                    </p>

                    <div
                        className={cn(
                            'flex flex-row items-center gap-3 sm:gap-4 md:justify-between -mr-8',
                            (isOpenCartDrawer || isOpenWishlistDrawer) &&
                                '!-mr-4'
                        )}
                    >
                        <HomeSeachBox />
                        <div
                            className={cn('flex flex-row items-center gap-4 ')}
                        >
                            <Link
                                href={'/'}
                                className="hidden sm:block relative"
                            >
                                <BiHeart
                                    onClick={() =>
                                        dispatch(openWishlistDrawer(true))
                                    }
                                    className={cn(
                                        'icon-base ',
                                        isContrast && 'text-white'
                                    )}
                                />
                                <div className="absolute w-5 h-5 flex flex-row items-center justify-center bg-red-600 rounded-full top-[5.5px] -translate-y-full -right-[12px] text-xs text-white">
                                    10
                                </div>
                            </Link>
                            <Link
                                href={''}
                                className="hidden sm:block relative"
                                onClick={() => dispatch(openCartDrawer(true))}
                            >
                                <BiCart
                                    className={cn(
                                        'icon-base ',
                                        isContrast && 'text-white'
                                    )}
                                />
                                <div className="absolute w-5 h-5 flex flex-row items-center justify-center bg-red-600 rounded-full top-[5.5px] -translate-y-full -right-3 text-xs text-white">
                                    10
                                </div>
                            </Link>
                            <UserMenu />
                            <WishlistDrawer />
                            <CartDrawer />
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
