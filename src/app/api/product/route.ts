import prisma from '@/services/prisma/prismaDB';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        const product = await prisma.product.findUnique({
            where: {
                name: requestData.name,
            },
            select: {
                name: true,
            },
        });

        if (!!product) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Sản phẩm đã tồn tại!',
            });
        } else {
            await prisma.product.create({
                data: {
                    ...requestData,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Thêm sản phẩm thành công!',
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

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const _req = req.nextUrl.searchParams;

        const pageLimit = Number(_req.get('pageLimit'));

        const pageNumber = Number(_req.get('page')) || 1;

        const allProducts = await prisma.product.findMany({
            skip: pageNumber * pageLimit - pageLimit,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const searchCount = allProducts.length;

        return NextResponse.json({
            isSuccess: true,
            data: allProducts,
            pagination: {
                pageNumber: pageNumber,
                totalRecord: allProducts.length,
                totalPage: pageLimit
                    ? Math.ceil(searchCount / pageLimit)
                    : searchCount,
                pageLimit: pageLimit,
            },
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
