import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        console.log(requestData.category.value);

        const product = await prisma.product.findUnique({
            where: requestData.name,
        });

        if (!!product) {
            return NextResponse.json({
                isSuccess: false,
                message: 'Sản phẩm đã tồn tại!',
            });
        } else {
            await prisma.product.create({
                data: {
                    ...requestData,
                    categoryId: requestData.category.value,
                    brandId: requestData.brand,
                },
            });
            return NextResponse.json({
                isSuccess: true,
                message: 'Thêm sản phẩm thành công!',
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
