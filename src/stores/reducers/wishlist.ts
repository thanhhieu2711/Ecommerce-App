import { TProductInfo } from '@/types/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
    wishList: TProductInfo[];
}

const initialState = { wishList: [] } as WishlistState;

const wishlistSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        updateValue(
            state: WishlistState,
            action: PayloadAction<WishlistState['wishList']>
        ) {
            state.wishList = action.payload;
        },
    },
});

export const { updateValue } = wishlistSlice.actions;
export default wishlistSlice.reducer;
