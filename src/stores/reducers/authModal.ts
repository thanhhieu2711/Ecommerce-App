import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthFlowState {
    isOpenRegisterModal: boolean;
    isOpenLoginModal: boolean;
}

const initialState = {
    isOpenLoginModal: false,
    isOpenRegisterModal: false,
} as AuthFlowState;

const authModalSlice = createSlice({
    name: 'auth-flow',
    initialState,
    reducers: {
        openRegisterModal(
            state: AuthFlowState,
            action: PayloadAction<AuthFlowState['isOpenRegisterModal']>
        ) {
            state.isOpenRegisterModal = action.payload;
        },
        openLoginModal(
            state: AuthFlowState,
            action: PayloadAction<AuthFlowState['isOpenLoginModal']>
        ) {
            state.isOpenLoginModal = action.payload;
        },

        swapModal(state: AuthFlowState) {
            if (state.isOpenLoginModal === true) {
                state.isOpenLoginModal = false;
                state.isOpenRegisterModal = true;
            } else {
                state.isOpenLoginModal = true;
                state.isOpenRegisterModal = false;
            }
        },
    },
});

export const { openLoginModal, openRegisterModal, swapModal } =
    authModalSlice.actions;
export default authModalSlice.reducer;
