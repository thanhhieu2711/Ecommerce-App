import prisma from '@/services/prisma/prismaDB';
import { calculateRating } from '@/utils/helper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const _req = req.nextUrl.searchParams;

        // console.log(req.nextUrl.searchParams);

        const pageLimit = Number(_req.get('pageLimit')) || 10;

        const name = _req.get('name');

        const categoryId = _req.get('categoryId');

        const brandId = _req.get('brandId');

        const available = Boolean(_req.get('available'));

        const ratting = Number(_req.get('ratting'));

        const priceRange = Number(_req.get('priceRange'));

        const sortAscByPrice = Boolean(_req.get('ascPrice'));

        const sortDescByPrice = Boolean(_req.get('descPrice'));

        const sortByCreatedAt = Boolean(_req.get('new'));

        const sortByBuyTurn = _req.get('buyTurn');

        const isHotSale = _req.get('hotsale');

        const pageNumber = Number(_req.get('page')) || 1;

        const filterResult = await prisma.product.findMany({
            where: {
                categoryId: !!categoryId ? categoryId : undefined,
                brandId: !!brandId ? brandId : undefined,
                name: {
                    contains: name || '',
                    mode: 'insensitive',
                },
                discount: {
                    gte: isHotSale ? 0.3 : undefined,
                },
                price: {
                    gte: priceRange > 0 ? priceRange : undefined,
                },
                buyTurn: {
                    gte: sortByBuyTurn ? 5 : undefined,
                },
                status: available ? 'AVAILABLE' : undefined,
                ratting: {
                    gte: ratting || undefined,
                },
            },
            orderBy: [
                {
                    price: sortDescByPrice
                        ? 'desc'
                        : sortAscByPrice
                        ? 'asc'
                        : undefined,
                },
                {
                    createdAt: sortByCreatedAt ? 'desc' : 'asc',
                },
            ],
            include: {
                feedback: true,
                category: true,
            },
        });

        const totalPage = Math.ceil(filterResult.length / pageLimit);

        return NextResponse.json({
            isSuccess: true,
            data: [...filterResult]
                .slice(
                    pageNumber * pageLimit - pageLimit,
                    pageNumber * pageLimit
                )
                .map((item) => {
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
                totalRecord: filterResult.length,
                totalPage: totalPage,
                pageLimit: pageLimit,
                hasPrev: pageNumber > 1,
                hasNext: pageNumber < totalPage,
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
