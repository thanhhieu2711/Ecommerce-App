import { useAppSelector } from '@/stores';
import { TProductInfo } from '@/types/general';

export const useWishlist = () => {
    const wishList = useAppSelector((state) => state.wishlist.wishList);

    const checkExist = (pid: TProductInfo['id']) => {
        const item = wishList.find((item) => item.id === pid);
        return !!item;
    };

    const wishListQuantity = useAppSelector(
        (state) => state.wishlist.wishList.length
    );

    return {
        wishList,
        checkExist,
        wishListQuantity,
    };
};

export default useWishlist;
