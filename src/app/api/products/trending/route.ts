import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json({
            isSucess: true,
            data: products,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            isSucess: false,
            data: [],
        });
    }
}
