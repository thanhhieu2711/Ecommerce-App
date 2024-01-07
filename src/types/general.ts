import {
    Brand,
    Category,
    Feedback,
    Order,
    OrderDetail,
    Product,
} from '@prisma/client';
import { TUserInfo } from './user';
export type TSidebarLink = {
    id: number;
    name: string;
    link: string;
    icon?: React.ReactNode;
};

export type TCategoryInfo = Category & {
    product: TProductInfo[];
};

export type TBrandInfo = Brand;

export type TOrderInfo = Order & {
    orderItems: Array<
        OrderDetail & {
            product: TProductInfo;
        }
    >;
};

export type TOrderDetailInfo = OrderDetail;

export type TProductInfo = Product & {
    feedback: TFeedback[];
    category: TCategoryInfo;
};

export type TFeedback = Feedback & {
    user: TUserInfo;
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

export type TCartItem = {
    product: TProductInfo;
    quantity: number;
    color: TColorInfo;
    capacity: TCapacityInfo;
    price: number;
};

export type TParams = {
    params: { id: string };
};

export type TBannerType = 'main' | 'sub';

export type TShippingService = { id: number; name: string; fee: number };
