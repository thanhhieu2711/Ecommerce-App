import { useAppSelector } from '@/stores';
import { TProductInfo } from '@/types/general';

export const useWishlist = () => {
    const wishList = useAppSelector((state) => state.wishlist.wishList);

    const checkExist = (pid: TProductInfo['id']) => {
        const item = wishList.find((item) => item.id === pid);
        return !!item;
    };

    return {
        wishList,
        checkExist,
    };
};

export default useWishlist;
