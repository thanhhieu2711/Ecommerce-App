import prisma from '@/services/prisma/prismaDB';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request, { params }: Params) {
    try {
        const articles = await prisma.article.findMany({
            where: {
                slug: {
                    not: params?.slug,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!!articles.length) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: articles,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json({
                isSuccess: false,
                message: 'Không tìm thấy bài viết!',
                data: undefined,
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
