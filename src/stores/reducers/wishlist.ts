import { TProductInfo } from '@/types/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface WishlistState {
    wishList: TProductInfo[];
}

const initialState = { wishList: [] } as WishlistState;

const wishlistSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        toggleAddToWishlist(
            state: WishlistState,
            action: PayloadAction<TProductInfo>
        ) {
            const index = state.wishList.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index == -1) {
                state.wishList.push(action.payload);
                toast.success('Đã thêm vào yêu thích !');
            } else {
                state.wishList = state.wishList.filter(
                    (item) => item.id !== action.payload.id
                );
                toast.success('Đã xóa khỏi yêu thích !');
            }
        },
        clearWishlist(state: WishlistState) {
            state.wishList = [];
            toast.success('Đã xóa danh sách yêu thích !');
        },
    },
});

export const { toggleAddToWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
