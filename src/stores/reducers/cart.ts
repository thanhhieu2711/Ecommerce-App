import { TProductInfo } from '@/types/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    listCart: TProductInfo[];
}

const initialState = { listCart: [] } as CartState;

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateValue(
            state: CartState,
            action: PayloadAction<CartState['listCart']>
        ) {
            state.listCart = action.payload;
        },
    },
});

export const { updateValue } = cartSlice.actions;
export default cartSlice.reducer;
