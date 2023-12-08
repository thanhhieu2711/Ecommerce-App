import { TParams } from '@/types/general';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: TParams) {
    const { id } = params;
    const requestData = await req.json();
    try {
        const category = await prisma?.category.findUnique({
            where: {
                id,
            },
        });

        if (!!category) {
            await prisma?.category.update({
                where: {
                    id,
                },
                data: {
                    ...requestData,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Chỉnh sửa danh mục thành công !',
            });
        }
        return NextResponse.json({
            isSuccess: false,
            message: 'Chỉnh sửa danh mục không thành công !',
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isSuccess: false,
            message: error,
        });
    }
}

export async function DELETE(req: Request, { params }: TParams) {
    const { id } = params;
    try {
        const category = await prisma?.category.findUnique({
            where: {
                id,
            },
        });

        if (!!category) {
            await prisma?.category.delete({
                where: {
                    id,
                },
            });
            return NextResponse.json(
                {
                    isSuccess: true,
                    message: 'Xóa thương hiệu thành công !',
                },
                {
                    status: 200,
                }
            );
        }
        return NextResponse.json({
            isSuccess: false,
            message: 'Xóa thương hiệu không thành công !',
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
