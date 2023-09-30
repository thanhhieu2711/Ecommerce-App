import { useAppSelector } from '@/stores';

export const useDrawer = () => {
    const isOpenCartDrawer = useAppSelector(
        (state) => state.drawer.isOpenCartDrawer
    );
    const isOpenWishlistDrawer = useAppSelector(
        (state) => state.drawer.isOpenWishlistDrawer
    );

    return {
        isOpenCartDrawer,
        isOpenWishlistDrawer,
    };
};

export default useDrawer;
