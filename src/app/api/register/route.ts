// import bycrypt from 'bcrypt';
// import prisma from '@/services/prisma/prismaDB';
// import { NextResponse } from 'next/server';
// import { Order } from '@prisma/client';

// export async function POST(request: Request) {
//     const body = await request.json();
//     const { email, password, phone } = body;

//     const hashPassword = await bycrypt.hashSync(password, 10);

//     const user = await prisma.user.create({
//         data: {
//             phone,
//             email,
//             password: hashPassword,
//         },
//     });
//     return NextResponse.json(user);
// }
