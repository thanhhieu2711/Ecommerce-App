import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const _request = await request.json();

        const category = await prisma.category.findUnique({
            where: {
                name: _request.name,
            },
            select: { name: true },
        });

        if (!!category) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Danh mục đã tồn tại!',
            });
        } else {
            await prisma.category.create({
                data: {
                    ..._request,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Thêm danh mục thành công!',
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                isSuccess: false,
                message: error,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const allCategories = await prisma.category.findMany();

        return NextResponse.json({
            isSuccess: true,
            message: 'Lấy danh sách danh mục thành công!',
            data: allCategories,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                isSuccess: false,
                message: error,
            },
            { status: 500 }
        );
    }
}
