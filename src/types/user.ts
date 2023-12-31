import { ROLE as TRoleUser } from '@prisma/client';
export const enum ERole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export type TUserInfo = {
    id: string;
    name?: string;
    email: string;
    phone: string;
    role: TRoleUser;
    createdAt: string;
    updatedAt: string;
};
