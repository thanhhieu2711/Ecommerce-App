import { PRODUCT_STATUS } from '@prisma/client';
import { type } from 'os';

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
    price: number;
    description: string;
    discount: number;
    buyTurn: number;
    images: string[];
    quantity: number;
    status: PRODUCT_STATUS;
    categoryId: string;
    brandId: string;
    createdAt: string;
    updatedAt: string;
};

export type TPagination = {
    pagaLimit: number;
    pageNumber: number;
    totalPage: number;
    totalRecord: number;
};
