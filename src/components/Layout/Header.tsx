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
                'max-w-full border-b border-black/5 bg-white fixed inset-x-0 top-0 transition-all duration-300 ease-out !min-h-[80px] z-30',
                isContrast && 'shadow-xl'
            )}
        >
            <Container>
                <div className="flex flex-row items-center justify-between py-5 max-w-full ">
                    <Link
                        href={'/'}
                        className={cn('font-bold text-3xl text-primary')}
                    >
                        LOGO
                    </Link>

                    <div
                        className={cn(
                            'flex flex-row items-center gap-4 sm:gap-4 md:justify-between -mr-6',
                            (isOpenCartDrawer || isOpenWishlistDrawer) &&
                                '!-mr-6'
                        )}
                    >
                        <HomeSeachBox />
                        <div
                            className={cn('flex flex-row items-center gap-6 ')}
                        >
                            <Link
                                href={''}
                                className="hidden sm:block relative"
                            >
                                <BiHeart
                                    onClick={(e: Event) => {
                                        e.preventDefault();
                                        dispatch(openWishlistDrawer(true));
                                    }}
                                    className={cn('icon-base ')}
                                />
                                <div className="absolute w-5 h-5 flex flex-row items-center justify-center bg-red-600 rounded-full top-[5.5px] -translate-y-full -right-[12px] text-xs text-white">
                                    10
                                </div>
                            </Link>
                            <Link
                                href={''}
                                className="hidden sm:block relative"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(openCartDrawer(true));
                                }}
                            >
                                <BiCart className={cn('icon-base ')} />
                                <div className="absolute w-5 h-5 flex flex-row items-center justify-center bg-red-600 rounded-full top-[5.5px] -translate-y-full -right-3 text-xs text-white">
                                    1
                                </div>
                            </Link>
                            <UserMenu isContrast={isContrast} />
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
