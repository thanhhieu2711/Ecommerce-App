import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinitialState {
    isOpenCartDrawer: boolean;
    isOpenWishlistDrawer: boolean;
}

const initialState = {
    isOpenCartDrawer: false,
    isOpenWishlistDrawer: false,
} as IinitialState;

const drawerSlice = createSlice({
    name: 'auth-flow',
    initialState,
    reducers: {
        openCartDrawer(
            state: IinitialState,
            action: PayloadAction<IinitialState['isOpenCartDrawer']>
        ) {
            state.isOpenCartDrawer = action.payload;
        },
        openWishlistDrawer(
            state: IinitialState,
            action: PayloadAction<IinitialState['isOpenWishlistDrawer']>
        ) {
            state.isOpenWishlistDrawer = action.payload;
        },
    },
});

export const { openCartDrawer, openWishlistDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
