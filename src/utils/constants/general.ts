import {
    TBannerType,
    TCapacityInfo,
    TColorInfo,
    TPagination,
    TShippingService,
    TSearchParam,
} from '@/types/general';

export const bannerList: {
    id: number;
    path: string;
    type: TBannerType;
}[] = [
    {
        id: 1,
        path: '/assets/images/banner/banner-1.jpeg',
        type: 'main',
    },
    {
        id: 2,
        path: '/assets/images/banner/banner-2.jpeg',
        type: 'main',
    },
    {
        id: 3,
        path: '/assets/images/banner/banner-3.jpeg',
        type: 'main',
    },
    {
        id: 4,
        path: '/assets/images/banner/banner-4.jpeg',
        type: 'main',
    },
    {
        id: 5,
        path: '/assets/images/banner/banner-5.jpeg',
        type: 'main',
    },
    {
        id: 6,
        path: '/assets/images/banner/banner-6.jpeg',
        type: 'main',
    },
    {
        id: 7,
        path: '/assets/images/banner/banner-7.png',
        type: 'main',
    },
    {
        id: 8,
        path: '/assets/images/banner/sub-banner-1.png',
        type: 'sub',
    },
    {
        id: 9,
        path: '/assets/images/banner/sub-banner-2.png',
        type: 'sub',
    },
    {
        id: 10,
        path: '/assets/images/banner/sub-banner-3.png',
        type: 'sub',
    },
];

export const discountPromotions: {
    id: number;
    image: string;
}[] = [
    {
        id: 1,
        image: '/assets/images/discount/hssv-tong-2024.webp',
    },
    {
        id: 2,
        image: '/assets/images/discount/laptop-hssv-sliding-2024.webp',
    },
    {
        id: 3,
        image: '/assets/images/discount/ss-hssv-sliding-2024.webp',
    },
    {
        id: 4,
        image: '/assets/images/discount/mo-the-hsbc-08-04-2024.webp',
    },

    {
        id: 5,
        image: '/assets/images/discount/momo-5-04-2024-slide.webp',
    },
    {
        id: 6,
        image: '/assets/images/discount/vib-update-01-04-2024.webp',
    },
];

export const colorList: TColorInfo[] = [
    {
        id: 1,
        name: 'Đen',
        hexcode: '#000000',
        extraPrice: 0,
    },
    {
        id: 2,
        name: 'Trắng',
        hexcode: '#ffffff',
        extraPrice: 0.03,
    },
    {
        id: 3,
        name: 'Đỏ',
        hexcode: '#ad0000',
        extraPrice: 0.2,
    },
    {
        id: 4,
        name: 'Vàng',
        hexcode: '#ffc125',
        extraPrice: 0.03,
    },
    {
        id: 5,
        name: 'Xanh',
        hexcode: '#1b4d80',
        extraPrice: 0.08,
    },
    {
        id: 6,
        name: 'Xanh lá',
        hexcode: '#4cbb17',
        extraPrice: 0.02,
    },
    {
        id: 7,
        name: 'Tím',
        hexcode: '#a020f0',
        extraPrice: 0.05,
    },
    {
        id: 8,
        name: 'Xám',
        hexcode: '#b1b3b6',
        extraPrice: 0.04,
    },
    {
        id: 9,
        name: 'Titan',
        hexcode: '#DDE1D6',
        extraPrice: 0.1,
    },
    {
        id: 10,
        name: 'Hồng',
        hexcode: '#e9d3d4',
        extraPrice: 0.06,
    },
    {
        id: 11,
        name: 'Cam',
        hexcode: '#F05817',
        extraPrice: 0.05,
    },
    {
        id: 12,
        name: 'Bạc',
        hexcode: '#e3e5e3',
        extraPrice: 0.04,
    },
];

export const capacityList: TCapacityInfo[] = [
    {
        id: 0,
        name: '8GB',
        extraPrice: 0,
    },
    {
        id: 1,
        name: '16GB',
        extraPrice: 0.04,
    },
    {
        id: 2,
        name: '32GB',
        extraPrice: 0.08,
    },
    {
        id: 3,
        name: '64GB',
        extraPrice: 0.1,
    },
    {
        id: 4,
        name: '128GB',
        extraPrice: 0.12,
    },
    {
        id: 5,
        name: '256GB',
        extraPrice: 0.15,
    },
    {
        id: 6,
        name: '512GB',
        extraPrice: 0.2,
    },
    {
        id: 7,
        name: '1TB',
        extraPrice: 0.35,
    },
    {
        id: 8,
        name: '2TB',
        extraPrice: 0.5,
    },
];

export const SHIPPING_SERVICES: TShippingService[] = [
    {
        id: 1,
        name: 'Tiêu chuẩn (3 ngày), GHN / GHTK',
        fee: 0,
    },
    {
        id: 2,
        name: 'Nhanh (1 ngày), GHN / GHTK',
        fee: 35000,
    },
    {
        id: 3,
        name: 'Hỏa Tốc , GHN / GHTK',
        fee: 70000,
    },
];

export const DEFAULT_PAGINATION: TPagination = {
    pagaLimit: 8,
    pageNumber: 1,
    totalPage: 0,
    totalRecord: 0,
};

export const SORT_OPTIONS: TSearchParam[] = [
    {
        title: 'Giá sản phẩm',
        key: 'priceRange',
        value: '',
        icon: '',
    },
    {
        title: 'Đánh giá',
        key: 'ratting',
        value: '',
        icon: '',
    },
    {
        title: 'Nhiều lượt mua',
        key: 'buyTurn',
        value: true,
        icon: '',
    },

    {
        title: 'Sẵn hàng',
        key: 'available',
        value: true,
        icon: '',
    },
    {
        title: 'Khuyến mãi hot',
        key: 'hotsale',
        value: true,
        icon: '',
    },
    {
        title: 'Mới nhất',
        key: 'new',
        value: true,
        icon: '',
    },
    {
        title: 'Giá cao - Thấp',
        key: 'descPrice',
        value: true,
        icon: '',
    },
    {
        title: 'Giá thấp - Cao',
        key: 'ascPrice',
        value: true,
        icon: '',
    },
];

export const DEFAULT_PAGELIMIT = 10;
