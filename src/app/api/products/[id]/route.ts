import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
type TParams = {
    params: {
        id: string;
    };
};

export async function GET(req: NextApiRequest, { params }: TParams) {
    try {
        const { id } = params;

        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        if (!!product) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Không tìm thấy sản phẩm!',
                data: product,
            });
        } else {
            return NextResponse.json({
                isSuccess: true,
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
                isSuccess: false,
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
