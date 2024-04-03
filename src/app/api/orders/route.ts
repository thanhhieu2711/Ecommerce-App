import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();

        console.log(requestData);

        if (!requestData) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Thanh toán thất bại!',
            });
        }
        const response = await prisma?.order.create({
            data: {
                ...requestData,
                nameReceiver: requestData.nameReceiver.toUpperCase(),
            },
        });

        if (response) {
            return NextResponse.json({
                isSuccess: true,
                data: response,
                message: 'Thanh toán thành công!',
            });
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Thanh toán thất bại!',
            });
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
export async function GET(_: NextRequest, res: NextResponse) {
    try {
        const response = await prisma?.order.findMany({
            include: {
                orderItems: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            isSuccess: true,
            data: response,
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
