import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpenRegisterModal: boolean;
    isOpenLoginModal: boolean;
    isOpenHomeSearchBoxModal: boolean;
}

const initialState: ModalState = {
    isOpenLoginModal: false,
    isOpenRegisterModal: false,
    isOpenHomeSearchBoxModal: false,
};

const modalSlice = createSlice({
    name: 'auth-flow',
    initialState,
    reducers: {
        openRegisterModal(
            state: ModalState,
            action: PayloadAction<ModalState['isOpenRegisterModal']>
        ) {
            state.isOpenRegisterModal = action.payload;
        },
        openLoginModal(
            state: ModalState,
            action: PayloadAction<ModalState['isOpenLoginModal']>
        ) {
            state.isOpenLoginModal = action.payload;
        },

        openHomeSearchBoxModal(
            state: ModalState,
            action: PayloadAction<ModalState['isOpenHomeSearchBoxModal']>
        ) {
            state.isOpenHomeSearchBoxModal = action.payload;
        },

        swapAuthModal(state: ModalState) {
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

export const {
    openLoginModal,
    openRegisterModal,
    swapAuthModal,
    openHomeSearchBoxModal,
} = modalSlice.actions;
export default modalSlice.reducer;
