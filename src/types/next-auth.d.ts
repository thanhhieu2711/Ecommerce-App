import { Feedback, Order, ROLE } from '@prisma/client';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            name: string;
            email: string;
            exp: number;
            token: string;
            avatar: string;
            phone: string;
            password: string;
            role: ROLE;
            orders: Order[];
            feedback: Feedback[];
            createdAt: Date;
            updatedAt: Date;
        };
    }
}
