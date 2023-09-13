import { BiCategory } from 'react-icons/bi';
import { AiOutlineBarChart } from 'react-icons/ai';
import {
    RiProductHuntLine,
    RiBillLine,
    RiAccountCircleLine,
} from 'react-icons/ri';
import { TbBrandBlogger } from 'react-icons/tb';
import { TSidebarLink } from '@/types/general';





export const SIDEBAR_LINK: TSidebarLink[] = [
    {
        id: 1,
        name: 'Thống kê',
        link: '/dashboard',
        icon: <AiOutlineBarChart className="w-6 h-6" />,
    },
    {
        id: 2,
        name: 'Sản phẩm',
        link: '/dashboard/products',
        icon: <RiProductHuntLine className="w-6 h-6" />,
    },
    {
        id: 4,
        name: 'Danh mục',
        link: '/dashboard/caterogies',
        icon: <BiCategory className="w-6 h-6" />,
    },
    {
        id: 5,
        name: 'Thương hiệu',
        link: '/dashboard/brands',
        icon: <TbBrandBlogger className="w-6 h-6" />,
    },
    {
        id: 5,
        name: 'Đơn hàng',
        link: '/dashboard/orders',
        icon: <RiBillLine className="w-6 h-6" />,
    },
    {
        id: 6,
        name: 'Tài khoản',
        link: '/dashboard/accounts',
        icon: <RiAccountCircleLine className="w-6 h-6" />,
    },
];
