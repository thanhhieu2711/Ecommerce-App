import prisma from '@/services/prisma/prismaDB';
import { NextRequest, NextResponse } from 'next/server';
import { calculateRating } from '@/utils/helper';
import { TParams } from '@/types/general';

export async function GET(req: NextRequest, { params }: TParams) {
    try {
        const { id } = params;

        const pid = id.slice(id.lastIndexOf('-') + 1);

        if (pid.length > 24 || pid.length < 24) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Không tìm thấy sản phẩm!',
                data: undefined,
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: pid,
            },
            include: {
                feedback: {
                    include: {
                        user: true,
                    },
                },
                category: true,
            },
        });

        if (!!product) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: {
                        ...product,
                        ratting: Math.ceil(
                            calculateRating(
                                product.feedback.map((feed) => feed.ratting)
                            )
                        ),
                    },
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Không tìm thấy sản phẩm!',
                data: product,
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
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!!product) {
            await prisma.product.update({
                where: {
                    id: product.id,
                },
                data: { ...requestData },
            });
            return NextResponse.json(
                {
                    isSuccess: true,
                    message: 'Chỉnh sửa sản phẩm thành công!',
                },
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Chỉnh sửa sản phẩm không thành công!',
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

export async function DELETE(req: Request, { params }: TParams) {
    const { id } = params;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!!product) {
            await prisma.product.delete({
                where: {
                    id: product.id,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Xóa sản phẩm thành công!',
            });
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Xóa sản không phẩm thành công!',
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
