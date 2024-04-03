import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();

        console.log(requestData);

        if (!requestData) {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Thanh toán thất bại!',
                },
                { status: 400 }
            );
        }
        const response = await prisma?.order.create({
            data: {
                ...requestData,
                nameReceiver: requestData.nameReceiver.toUpperCase(),
            },
            include: {
                orderItems: true,
            },
        });

        if (response) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: response,
                    message: 'Thanh toán thành công!',
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    isSuccess: false,
                    message: 'Thanh toán thất bại!',
                },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                isSuccess: false,
                message: error,
            },
            { status: 500 }
        );
    }
}
