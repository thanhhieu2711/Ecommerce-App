import { PRODUCT_STATUS as EProductStatus } from '@prisma/client';

export type TSidebarLink = {
    id: number;
    name: string;
    link: string;
    icon?: React.ReactNode;
};

export type TCategoryInfo = {
    id: string;
    name: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
};

export type TBrandInfo = {
    id: string;
    name: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
};

export type TProductInfo = {
    id: string;
    name: string;
    price: Number;
    description: string;
    discount: Number;
    buyTurn: Number;
    images: string[];
    quantity: number;
    status: EProductStatus;
    categoryId: string;
    brandId: string;
    createdAt: string;
    updatedAt: string;
};
