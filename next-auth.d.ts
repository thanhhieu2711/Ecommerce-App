import { ROLE } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        email: string;
        password: string;
    }

    interface Session {
        user: {
            id: string;
            phone: string;
            name?: string;
            role: ROLE;
            avatar?: string;
        } & User;
    }
}
