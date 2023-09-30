import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { calculateRating } from '@/utils/helper';

type TParams = {
    params: {
        id: string;
    };
};

export async function GET(req: NextApiRequest, { params }: TParams) {
    try {
        const { id } = params;

        const pid =
            id.slice(id.lastIndexOf('-') + 1).length === 24
                ? id.slice(id.lastIndexOf('-') + 1)
                : '6513e7b397fd712345678910';

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
            },
        });

        if (!!product) {
            return NextResponse.json({
                isSuccess: true,
                data: {
                    ...product,
                    ratting: Math.ceil(
                        calculateRating(
                            product.feedback.map((feed) => feed.ratting)
                        )
                    ),
                },
            });
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
            return NextResponse.json({
                isSuccess: true,
                message: 'Chỉnh sửa sản phẩm thành công!',
            });
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

export async function DELETE(req: NextApiRequest, { params }: TParams) {
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
