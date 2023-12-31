import bycrypt from 'bcrypt';
import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password, name, phone, avatar } = await request.json();

        if (!email && !password) {
            return;
        }
        console.log({ name, email });

        const isExist = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email,
                    },
                    {
                        phone,
                    },
                ],
            },
        });

        if (isExist !== null) {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Email hoặc số điện thoại đã tồn tại!',
                },
                { status: 201 }
            );
        }

        const hashPassword = await bycrypt.hashSync(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                name,
                avatar: '',
                phone,
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
