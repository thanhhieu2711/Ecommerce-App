import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const _req = await request.json();

        if (!_req.content) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Vui lòng nhập nội dung',
            });
        } else {
            await prisma.feedback.create({
                data: {
                    ..._req,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Gửi đánh giá thành công!',
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

export async function GET() {
    try {
        const allFeedback = await prisma.feedback.findMany({
            where: {},
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!!allFeedback.length) {
            return NextResponse.json({
                isSuccess: true,
                message: 'Lấy danh sách đánh giá thành công!',
                data: allFeedback,
            });
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Không tìm thấy đánh giá!',
                data: [],
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
