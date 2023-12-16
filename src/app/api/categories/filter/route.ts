import prisma from '@/services/prisma/prismaDB';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const _req = req.nextUrl.searchParams;

        const pageLimit = Number(_req.get('pageLimit')) || 4;

        const name = _req.get('name');

        const categoryId = _req.get('category');

        const pageNumber = Number(_req.get('page')) || 1;

        const filterResult = await prisma.category.findMany({
            skip: pageNumber * pageLimit - pageLimit,
            take: pageLimit,
            where: {
                id: categoryId ?? undefined,
                name: {
                    contains: name || '',
                    mode: 'insensitive',
                },
            },

            orderBy: {
                createdAt: 'desc',
            },
        });

        const searchCount = (await prisma.category.findMany()).length;

        const totalPage = name
            ? Math.ceil(filterResult.length / pageLimit)
            : Math.ceil(searchCount / pageLimit);

        return NextResponse.json({
            isSuccess: true,
            data: filterResult,
            pagination: {
                pageNumber: pageNumber,
                totalRecord: name ? filterResult.length : searchCount,
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
