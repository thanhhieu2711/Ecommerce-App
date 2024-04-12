import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import slugify from 'slugify';
export async function POST(request: Request) {
    try {
        const req = await request.json();
        const article = await prisma.article.findUnique({
            where: {
                title: req.title,
            },
            select: {
                title: true,
            },
        });
        if (!!article) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Bài viết đã tồn tại!',
            });
        } else {
            await prisma.article.create({
                data: {
                    ...req,
                    slug: slugify(req.title),
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Tạo bài viết thành công!',
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
        const allBrands = await prisma.article.findMany({
            take: 6,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            isSuccess: true,
            message: 'Lấy danh sách bài viết thành công!',
            data: allBrands,
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
