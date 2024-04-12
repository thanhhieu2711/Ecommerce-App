import prisma from '@/services/prisma/prismaDB';
import { NextRequest, NextResponse } from 'next/server';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function GET(req: NextRequest, { params }: Params) {
    try {
        console.log(req.headers.get('X-Forwarded-For'));
        const { slug } = params;

        const article = await prisma.article.findFirst({
            where: {
                slug: {
                    contains: slug,
                    mode: 'insensitive',
                },
            },
        });

        if (!!article) {
            return NextResponse.json(
                {
                    isSuccess: true,
                    data: {
                        ...article,
                    },
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
