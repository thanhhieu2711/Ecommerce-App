import { Feedback, Order, ROLE } from '@prisma/client';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    interface User {
        name: string;
        email: string;
        phone: string;
        password: string;
        role: ROLE;
    }
    interface Session {
        user: {
            id: number;
            exp: number;
            token: string;
            avatar: string;
            createdAt: Date;
            updatedAt: Date;
        } & User;
    }
}
