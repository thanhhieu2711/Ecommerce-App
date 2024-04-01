import prisma from '@/services/prisma/prismaDB';
import { NextRequest, NextResponse } from 'next/server';
import { TParams } from '@/types/general';

export async function GET(_: NextRequest, { params }: TParams) {
    try {
        const { id } = params;

        let orderId = id;

        if (orderId.length < 24 || orderId.length > 24) {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Mã đơn hàng không tồn tại!',
                },
                { status: 201 }
            );
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!!order) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: {
                        ...order,
                    },
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Mã đơn hàng không tồn tại!',
                },
                { status: 201 }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                isSuccess: false,
                message: error,
            },
            { status: 201 }
        );
    }
}
