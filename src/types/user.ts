export const enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export type TUserInfo = {
    id: string;
    name?: string;
    email: string;
    phone: string;
    role: ROLE;
    createdAt: string;
    updatedAt: string;
};
