import bycrypt from 'bcrypt';
import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email && !password) {
            return;
        }

        const isExist = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (isExist?.id) {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Tài khoản đã tồn tại!',
                },
                { status: 201 }
            );
        }

        const hashPassword = await bycrypt.hashSync(password, 10);

        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                name: '',
                avatar: '',
                phone: '',
            },
        });

        return NextResponse.json(
            {
                isSuccess: true,
                message: 'Đăng ký thành công',
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                isSuccess: false,
                message: 'Internal server error!',
            },
            { status: 500 }
        );
    }
}
