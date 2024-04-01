import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProviders from 'next-auth/providers/credentials';
import prisma from '@/services/prisma/prismaDB';
import bcrypt from 'bcrypt';

const authOptions: AuthOptions = {
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
                    return null;
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
                }
                return user;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                token.id = user.id;
                return {
                    ...user,
                    token: token.id,
                    password: null,
                };
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
    session: {
        maxAge: 6 * 60 * 60,
        // updateAge: 24 * 60 * 60, // 24 hours to update session data into database
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
        maxAge: 7 * 24 * 60 * 60,
    },

    debug: process.env.NODE_ENV === 'development',

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/',
    },
};

export default authOptions;
