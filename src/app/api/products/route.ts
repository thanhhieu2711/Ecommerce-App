import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

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

export async function GET({ searchParams }: any) {
    console.log(searchParams);
    try {
        // const allProducts = await prisma.product.findMany({
        //     take: _req.limit,
        //     where: {},
        //     orderBy: {
        //         createdAt: 'desc',
        //     },
        // });
        // return NextResponse.json({
        //     isSuccess: true,
        //     data: {
        //         pagination: {
        //             pageNumber: 1,
        //             totalRecord: allProducts.length,
        //             totalPage: Math.ceil(
        //                 allProducts.length / (_req.limit || 10)
        //             ),
        //             pageLimit: _req.limit,
        //         },
        //         itemsList: allProducts,
        //     },
        // });
        const allProducts = await prisma.product.findMany({
            take: 8,
            where: {},
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json({
            isSuccess: true,
            data: allProducts,

            // pagination: {
            //     pageNumber: 1,
            //     totalRecord: allProducts.length,
            //     totalPage: Math.ceil(
            //         allProducts.length / (_req.limit || 10)
            //     ),
            //     pageLimit: _req.limit,
            // },
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
