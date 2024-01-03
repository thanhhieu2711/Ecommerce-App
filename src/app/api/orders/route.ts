import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const _req = await req.json();

        if (!_req) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Thanh toán thất bại!',
            });
        }

        const response = await prisma?.order.create({
            data: { ..._req },
            include: {
                orderItems: true,
            },
        });

        if (!!response) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: response,
                    message: 'Thanh toán thành công!',
                },
                { status: 200 }
            );
        }
        return NextResponse.json(
            {
                isSuccess: true,
                data: response,
                message: 'Thanh toán thất bại!',
            },
            { status: 200 }
        );
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
