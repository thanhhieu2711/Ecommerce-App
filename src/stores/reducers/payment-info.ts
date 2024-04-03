import { TShippingService } from '@/types/general';
import { SHIPPING_SERVICES } from '@/utils/constants/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentInfoState {
    shippingService?: Omit<TShippingService, 'id'>;
}

const initialState = {
    shippingService: SHIPPING_SERVICES[0],
} as PaymentInfoState;

const paymentInfoSlice = createSlice({
    name: 'paymentInfo',
    initialState,
    reducers: {
        updateShippingService(
            state: PaymentInfoState,
            action: PayloadAction<PaymentInfoState>
        ) {
            const { shippingService } = action.payload;
            state.shippingService = shippingService;
        },
        clearShippingService(state: PaymentInfoState) {
            state.shippingService = undefined;
        },
    },
});

export const { updateShippingService, clearShippingService } =
    paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;
