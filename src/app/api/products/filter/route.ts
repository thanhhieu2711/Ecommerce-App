import prisma from '@/services/prisma/prismaDB';
import { calculateRating } from '@/utils/helper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const _req = req.nextUrl.searchParams;

        const pageLimit = Number(_req.get('pageLimit')) || 10;

        const name = _req.get('name');

        const categoryId = _req.get('categoryId');

        const brandId = _req.get('brandId');

        // const priceRange = _req.get('priceRange');

        const isHotSale = _req.get('hotsale');

        const pageNumber = Number(_req.get('page')) || 1;

        const filterResult = await prisma.product.findMany({
            skip: pageNumber * pageLimit - pageLimit,
            take: pageLimit,
            where: {
                categoryId: !!categoryId ? categoryId : undefined,
                brandId: !!brandId ? brandId : undefined,
                name: {
                    contains: name || '',
                    mode: 'insensitive',
                },
                discount: {
                    gt: isHotSale ? 0.15 : undefined,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                feedback: true,
                category: true,
            },
        });

        const searchCount = (await prisma.product.findMany()).length;

        const totalPage = name
            ? Math.ceil(filterResult.length / pageLimit)
            : Math.ceil(searchCount / pageLimit);

        return NextResponse.json({
            isSuccess: true,
            data: filterResult.map((item) => {
                return {
                    ...item,
                    ratting: Math.ceil(
                        calculateRating(
                            item.feedback.map((feed) => feed.ratting)
                        )
                    ),
                };
            }),
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
