import { TParams } from '@/types/general';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: TParams) {
    const { id } = params;
    const requestData = await req.json();
    try {
        const feedback = await prisma?.feedback.findUnique({
            where: {
                id,
            },
        });

        if (!!feedback) {
            await prisma?.feedback.update({
                where: {
                    id,
                },
                data: {
                    ...requestData,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Chỉnh sửa danh mục thành công!',
            });
        }
        return NextResponse.json({
            isSuccess: false,
            message: 'Chỉnh sửa danh mục không thành công!',
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
        const feedback = await prisma?.feedback.findUnique({
            where: {
                id,
            },
        });

        if (!!feedback) {
            await prisma?.feedback.delete({
                where: {
                    id,
                },
            });
            return NextResponse.json(
                {
                    isSuccess: true,
                    message: 'Xóa đánh giá thành công !',
                },
                {
                    status: 200,
                }
            );
        }
        return NextResponse.json({
            isSuccess: false,
            message: 'Xóa đánh giá không thành công !',
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
