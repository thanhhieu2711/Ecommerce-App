'use client';
import Container from './Container';
import { Input } from 'antd';
import { BiSearch, BiCart, BiHeart } from 'react-icons/bi';
import Link from 'next/link';
import cn from 'classnames';
import UserMenu from '../UserMenu';
import HomeSeachBox from '../HomeSeachBox';

type Props = {
    isContrast: boolean;
};

export default function Header({ isContrast }: Props) {
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

                    <div className="flex flex-row items-center gap-3 sm:gap-4 md:justify-between">
                        <HomeSeachBox />
                        <div className="flex flex-row items-center gap-4 ">
                            <Link href={'/'} className="hidden sm:block">
                                <BiHeart
                                    className={cn(
                                        'icon-base ',
                                        isContrast && 'text-white'
                                    )}
                                />
                            </Link>
                            <Link href={'/'} className="hidden sm:block">
                                <BiCart
                                    className={cn(
                                        'icon-base ',
                                        isContrast && 'text-white'
                                    )}
                                />
                            </Link>

                            <UserMenu />
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
