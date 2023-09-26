import { PRODUCT_STATUS } from '@prisma/client';
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
    specifications: string;
    discount: number;
    buyTurn: number;
    images: string[];
    color: string[];
    capacity: string[];
    rattting: number;
    quantity: number;
    status: PRODUCT_STATUS;
    categoryId: string;
    brandId: string;
    feedback: string[];
    createdAt: string;
    updatedAt: string;
};

export type TPagination = {
    pagaLimit: number;
    pageNumber: number;
    totalPage: number;
    totalRecord: number;
};

export type TColorInfo = {
    id: number;
    name: string;
    hexcode: string;
    extraPrice: number;
};
export type TCapacityInfo = {
    id: number;
    name: string;
    extraPrice: number;
};

export type TBannerType = 'main' | 'sub';
