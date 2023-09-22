import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { TUserInfo } from '@/types/user';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Tài khoản không tồn tại !',
                    data: null,
                },
                { status: 201 }
            );
        }

        const checkUser = await bcrypt.compare(password, user.password);

        if (checkUser) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    message: 'Đăng nhập thành công !',
                    data: user,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Mật khẩu không chính xác !',
                    data: null,
                },
                { status: 201 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                isSuccess: false,
                message: error,
            },
            { status: 500 }
        );
    }
}
