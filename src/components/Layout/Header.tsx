'use client';
import Container from './Container';
import { Input } from 'antd';
import { BiSearch, BiCart, BiHeart, BiUserCircle } from 'react-icons/bi';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';
import { useAppDispatch } from '@/stores';
import { openLoginModal, openRegisterModal } from '@/stores/reducers/authModal';
import { signOut } from 'next-auth/react';

type Props = {
    isContrast: boolean;
};

export default function Header({ isContrast }: Props) {
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
                            'font-bold text-3xl',
                            isContrast && 'text-white'
                        )}
                    >
                        LOGO
                    </p>

                    <div className="flex flex-row items-center gap-4 md:justify-between">
                        <div className=" sm:w-[300px]">
                            <Input
                                suffix={
                                    <BiSearch className="icon-base ml-px" />
                                }
                                placeholder="Nhập thông tin sản phẩm"
                                className="border-none ring-0 bg-neutral-100 text-sm "
                                styles={{
                                    input: {
                                        backgroundColor: '#F5F5F5',
                                    },
                                }}
                                size="large"
                            />
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <Link href={'/'}>
                                <BiHeart
                                    className={cn(
                                        'icon-base ',
                                        isContrast && 'text-white'
                                    )}
                                />
                            </Link>
                            <Link href={'/'}>
                                <BiCart
                                    className={cn(
                                        'icon-base ',
                                        isContrast && 'text-white'
                                    )}
                                />
                            </Link>
                            <div className="relative">
                                <button
                                    className="p-0 m-0  border-none hover:ring-0 flex"
                                    onClick={() => {}}
                                >
                                    <BiUserCircle
                                        className={cn(
                                            'icon-base ',
                                            isContrast && 'text-white'
                                        )}
                                    />
                                </button>
                                <div className="absolute w-[200px] rounded-lg bg-white shadow-lg top-9 right-0">
                                    <ul>
                                        <li
                                            className="text-sm px-3 py-3 cursor-pointer"
                                            onClick={() =>
                                                dispatch(openLoginModal(true))
                                            }
                                        >
                                            Đăng nhập
                                        </li>
                                        <li
                                            className="text-sm px-3 py-3 hover:bg-neutral-200 cursor-pointer"
                                            onClick={() =>
                                                dispatch(
                                                    openRegisterModal(true)
                                                )
                                            }
                                        >
                                            Đăng ký
                                        </li>
                                        <li
                                            className="text-sm px-3 py-3 hover:bg-neutral-200 cursor-pointer"
                                            onClick={() => signOut()}
                                        >
                                            Đăng xuất
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
