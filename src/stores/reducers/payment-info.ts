import { TShippingService } from '@/types/general';
import { shippingServices } from '@/utils/constants/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentInfoState {
    shippingService: Omit<TShippingService, 'id'>;
    total?: number;
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
            const { shippingService, total } = action.payload;
            state.shippingService = shippingService;
            state.total = total;
        },
        clearPaymentInfo(state: PaymentInfoState) {
            state = {} as PaymentInfoState;
        },
    },
});

export const { updatePaymentInfo, clearPaymentInfo } = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;
