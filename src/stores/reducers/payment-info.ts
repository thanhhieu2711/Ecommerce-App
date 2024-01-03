import { TShippingService } from '@/types/general';
import { shippingServices } from '@/utils/constants/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentInfoState {
    shippingService: Omit<TShippingService, 'id'>;
}

const initialState = {
    shippingService: shippingServices[0],
} as PaymentInfoState;

const paymentInfoSlice = createSlice({
    name: 'paymentInfo',
    initialState,
    reducers: {
        updatePaymentInfo(
            state: PaymentInfoState,
            action: PayloadAction<PaymentInfoState>
        ) {
            const { shippingService } = action.payload;
            state.shippingService = shippingService;
        },
        clearPaymentInfo(state: PaymentInfoState) {
            state.shippingService = shippingServices[0];
        },
    },
});

export const { updatePaymentInfo, clearPaymentInfo } = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;
