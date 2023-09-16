import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextResponse } from 'next/server';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProviders from 'next-auth/providers/credentials';
import prisma from '@/services/prisma/prismaDB';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProviders({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid input');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error('Email không tồn tại');
                }

                const isCorrectPassword = bcrypt.compareSync(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error('Mật khẩu không chính xác');
                } else {
                    return user;
                }
            },
        }),
    ],
    events: {
        async signIn(message) {},
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
        maxAge: 24 * 60 * 60,
    },
    debug: process.env.NODE_ENV === 'development',

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
