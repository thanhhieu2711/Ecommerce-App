import prisma from '@/services/prisma/prismaDB';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        const product = await prisma.product.findUnique({
            where: {
                name: requestData.name,
            },
            select: { name: true },
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

        const pageLimit = 8;

        const searchPage = Number(_req.get('page'));

        const searchByName = _req.get('name');

        const totalPage = Math.ceil(
            (await prisma.product.findMany()).length / pageLimit
        );

        const allProducts = await prisma.product.findMany({
            skip:
                searchPage < 2
                    ? 0
                    : pageLimit * searchPage -
                      (searchPage * pageLimit) / searchPage,
            take: pageLimit,
            where: {
                name: {
                    contains: searchByName?.replace(
                        /[-\/\\^$*+?.()|[\]{}]/g,
                        '\\$&'
                    ),
                    mode: 'insensitive',
                },
            },

            orderBy: {
                createdAt: 'desc',
            },
        });

        const searchCount = allProducts.length;

        return NextResponse.json({
            isSuccess: true,
            data: allProducts,
            pagination: {
                pageNumber: searchByName ? 1 : searchPage,
                totalRecord: searchByName
                    ? searchCount
                    : (await prisma.product.findMany()).length,
                totalPage: searchByName
                    ? Math.ceil(searchCount / pageLimit)
                    : totalPage,
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

export async function filterProduct(req: NextRequest) {
    const _req = req.nextUrl.searchParams;

    const filterByCategoryId = _req.get('category');

    const filterByBrandId = _req.get('brand');

    const filterByPriceRange = _req.get('priceRange');
}
