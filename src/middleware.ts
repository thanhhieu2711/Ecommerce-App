import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_JWT_SECRET,
        cookieName:
            process.env.NODE_ENV === 'development'
                ? 'next-auth.session-token'
                : '__Secure-next-auth.session-token',
    });

    if (token === null) {
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.redirect(
                process.env.NEXTAUTH_URL || 'http://localhost:3000/'
            );
        }
        return NextResponse.redirect(
            process.env.NEXTAUTH_URL_PUBLIC || 'https://raven-store.vercel.app/'
        );
    } else {
        if (token?.role !== 'ADMIN' && currentPath.includes('dashboard')) {
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.redirect(
                    process.env.NEXTAUTH_URL || 'http://localhost:3000/'
                );
            }
            return NextResponse.redirect(
                process.env.NEXTAUTH_URL_PUBLIC ||
                    'https://raven-store.vercel.app/'
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/:path*', '/dashboard/:path*'],
};
