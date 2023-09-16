import React from 'react';
import Container from './Container';
import Link from 'next/link';

type Props = {};

export default function Footer(props: Props) {
    return (
        <footer className="max-w-full h-full mt-auto border-t border-black/5">
            <Container>
                <div className="w-full h-full flex flex-row py-6">
                    <div className="basis-[300px] h-full flex flex-col gap-4">
                        <Link href={'/'}>
                            <p className="text-3xl font-bold">LOGO</p>
                        </Link>
                        <p className="text-sm text-black/50">© 2023 logo.</p>
                    </div>
                    <div className="flex-1 flex flex-row flex-wrap items-center">
                        <div className="flex-1">Hổ trợ</div>
                        <div className="flex-1">Tài khoản</div>
                        <div className="flex-1">Chính sách</div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
