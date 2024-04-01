import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_JWT_SECRET,
    });

    console.log(token);

    // if (
    //     currentPath.includes('dashboard') &&
    //     (token?.role !== 'ADMIN' || !token)
    // ) {
    //     if (process.env.NODE_ENV === 'development') {
    //         return NextResponse.redirect(process.env.NEXTAUTH_URL as string);
    //     }
    //     return NextResponse.redirect(process.env.NEXTAUTH_URL_PUBLIC as string);
    // }

    // if (currentPath.includes('checkout') && token === null) {
    //     if (process.env.NODE_ENV === 'development') {
    //         return NextResponse.redirect(process.env.NEXTAUTH_URL as string);
    //     }
    //     return NextResponse.redirect(process.env.NEXTAUTH_URL_PUBLIC as string);
    // }

    return NextResponse.next();
}
