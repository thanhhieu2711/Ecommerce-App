import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const _request = await request.json();
        console.log(_request);

        const brand = await prisma.brand.findUnique({
            where: {
                name: _request.name,
            },
            select: {
                name: true,
            },
        });
        if (!!brand) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Thương hiệu đã tồn tại!',
            });
        } else {
            await prisma.brand.create({
                data: {
                    ..._request,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Thêm thương hiệu thành công!',
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
        const allBrands = await prisma.brand.findMany();

        return NextResponse.json({
            isSuccess: true,
            message: 'Lấy danh sách thương hiệu thành công!',
            data: allBrands,
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
