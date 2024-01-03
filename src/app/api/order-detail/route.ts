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

        await prisma?.orderDetail.createMany({
            data: [..._req.orderDetails],
        });

        return NextResponse.json(
            {
                isSuccess: true,
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
