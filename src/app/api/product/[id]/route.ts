import prisma from '@/services/prisma/prismaDB';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { useRouter } from 'next/navigation';

export async function GET(params: { prams: { id: string } }) {
    console.log(params);
    // try {
    //     const requestData = await request.json();
    //     console.log(requestData);
    //     const product = await prisma.product.findUnique({
    //         where: {
    //             name: requestData.name,
    //         },
    //         select: { name: true },
    //     });
    //     if (!!product) {
    //         return NextResponse.json({
    //             isSuccess: false,
    //             message: 'Sản phẩm đã tồn tại!',
    //         });
    //     } else {
    //         await prisma.product.create({
    //             data: {
    //                 ...requestData,
    //             },
    //         });
    //         return NextResponse.json({
    //             isSuccess: true,
    //             message: 'Thêm sản phẩm thành công!',
    //         });
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.json(
    //         {
    //             isSuccess: false,
    //             message: error,
    //         },
    //         { status: 500 }
    //     );
    // }
}

// export async function GET() {
//     try {
//         const allProducts = await prisma.product.findMany();

//         return NextResponse.json({
//             isSuccess: true,
//             message: 'Lấy danh sách sản phẩm thành công!',
//             data: allProducts,
//         });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json(
//             {
//                 isSuccess: false,
//                 message: error,
//             },
//             { status: 500 }
//         );
//     }
// }
