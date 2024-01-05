import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { TParams } from '@/types/general';

export async function GET(req: NextApiRequest, { params }: TParams) {
    try {
        const { id } = params;

        const customer = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                feedback: {
                    include: {
                        user: true,
                    },
                },
                orders: {
                    include: {
                        orderItems: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        if (!!customer) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: {
                        ...customer,
                    },
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Không tìm thấy người dùng!',
                data: customer,
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

export async function PATCH(request: Request, { params }: TParams) {
    const { id } = params;
    const requestData = await request.json();

    try {
        const customer = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!!customer) {
            await prisma.product.update({
                where: {
                    id: customer.id,
                },
                data: { ...requestData },
            });
            return NextResponse.json(
                {
                    isSuccess: true,
                    message: 'Chỉnh sửa thông tin thành công!',
                },
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Chỉnh sửa thông tin không thành công!',
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
