import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
export async function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_JWT_SECRET,
    });

    if (
        currentPath.includes('dashboard') &&
        (token?.role !== 'ADMIN' || !token)
    ) {
        return NextResponse.redirect(
            process.env.NEXTAUTH_URL || 'http://localhost:3000/'
        );
    }
    return;
}
