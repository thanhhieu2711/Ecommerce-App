import { TBannerType, TCapacityInfo, TColorInfo } from '@/types/general';

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
        extraPrice: 0.02,
    },
    {
        id: 3,
        name: 'Đỏ',
        hexcode: '#ad0000',
        extraPrice: 0,
    },
    {
        id: 4,
        name: 'Vàng',
        hexcode: '#ffc125',
        extraPrice: 0.02,
    },
    {
        id: 5,
        name: 'Xanh',
        hexcode: '#1b4d80',
        extraPrice: 0.05,
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
        hexcode: '#808080',
        extraPrice: 0,
    },
    {
        id: 9,
        name: 'Titan',
        hexcode: '#DDE1D6',
        extraPrice: 0.06,
    },
    {
        id: 10,
        name: 'Hồng',
        hexcode: '#e9d3d4',
        extraPrice: 0.05,
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
        extraPrice: 0.02,
    },
    {
        id: 2,
        name: '32GB',
        extraPrice: 0.04,
    },
    {
        id: 3,
        name: '64GB',
        extraPrice: 0.06,
    },
    {
        id: 4,
        name: '128GB',
        extraPrice: 0.08,
    },
    {
        id: 5,
        name: '256GB',
        extraPrice: 0.11,
    },
    {
        id: 6,
        name: '512GB',
        extraPrice: 0.15,
    },
];
