import prisma from '@/services/prisma/prismaDB';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const _req = req.nextUrl.searchParams;

        console.log(_req);

        const pageLimit = Number(_req.get('pageLimit')) || 10;

        const categoryId = _req.get('category');

        const brandId = _req.get('brand');

        const priceRange = _req.get('priceRange');

        const pageNumber = Number(_req.get('page'));

        const filterResult = await prisma.product.findMany({
            skip:
                pageNumber < 2
                    ? 0
                    : pageLimit * pageNumber -
                      (pageNumber * pageLimit) / pageNumber,
            take: pageLimit,
            where: {
                categoryId: categoryId ?? undefined,
                brandId: brandId ?? undefined,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });

        const totalPage = Math.ceil(filterResult.length / pageLimit);

        return NextResponse.json({
            isSuccess: true,
            data: filterResult,
            pagination: {
                pageNumber: pageNumber || 1,
                totalRecord: filterResult.length,
                totalPage: totalPage,
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
