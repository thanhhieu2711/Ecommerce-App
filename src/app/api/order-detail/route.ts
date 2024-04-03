import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const _req = await request.json();

        if (!_req.orderDetails) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Invalid input',
            });
        }

        const res = await prisma?.orderDetail.createMany({
            data: [..._req.orderDetails],
        });

        const productIds = _req.orderDetails?.map(
            (item: any) => item.productId
        );

        const updateBuyTurnOfProducts = await prisma?.product.updateMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            data: {
                buyTurn: {
                    increment: 1,
                },
            },
        });

        if (!!res?.count && !!updateBuyTurnOfProducts?.count) {
            return NextResponse.json(
                {
                    isSuccess: true,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Invalid input',
                },
                { status: 200 }
            );
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
