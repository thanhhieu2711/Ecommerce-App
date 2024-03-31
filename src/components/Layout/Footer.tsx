import React from 'react';
import Container from './Container';
import Link from 'next/link';

type Props = {};

export default function Footer(props: Props) {
    return (
        <footer className="max-w-full h-full border-t border-black/5">
            <Container>
                <div className="w-full h-full grid grid-cols-4 py-4">
                    <div className="col-span-1">
                        <Link href={'/'}>
                            <p className="text-3xl font-bold">LOGO</p>
                        </Link>
                    </div>
                    <div className="col-span-1">
                        <p className="tex-lg font-semibold ">
                            Thông tin chính sách
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="tex-lg font-semibold ">
                            Dịch vụ và thông tin khác
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p className="tex-lg font-semibold ">Hổ trợ</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
