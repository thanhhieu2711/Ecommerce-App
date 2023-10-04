import { TCartItem } from '@/types/general';
import { priceCalculator } from '@/utils/helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface CartState {
    listCart: TCartItem[];
}

const initialState = { listCart: [], isClearCart: false } as CartState;

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state: CartState, action: PayloadAction<TCartItem>) {
            const { product, quantity, color, capacity, price } =
                action.payload;

            const index = state.listCart.findIndex(
                (cartItem) =>
                    cartItem.product.id === product.id &&
                    cartItem.color?.id === color?.id &&
                    cartItem.capacity?.id === capacity?.id
            );

            const item = state.listCart[index];

            if (index === -1) {
                state.listCart.push(action.payload);
            } else {
                const _quantity = item.quantity + quantity;
                const _price = item.price + price;
                state.listCart[index] = {
                    ...item,
                    quantity: _quantity,
                    price: _price,
                };
            }
            toast.success('Đã thêm vào giỏ hàng !');
        },
        removeFromCart(
            state: CartState,
            action: PayloadAction<{ index: number }>
        ) {
            const { index } = action.payload;
            state.listCart = state.listCart.filter(
                (_, _index) => _index !== index
            );
            toast.success('Đã xóa khỏi giỏ hàng !');
        },
        increaseQuantity(
            state: CartState,
            action: PayloadAction<{ index: number }>
        ) {
            const { index } = action.payload;

            const item = state.listCart[index];

            item.quantity += 1;

            item.price =
                priceCalculator({
                    value: item.product.price,
                    extraPrice:
                        (item.color?.extraPrice || 0) +
                        (item.capacity?.extraPrice || 0),
                    discount: item.product.discount,
                }) * item.quantity;
        },

        decreaseQuantity(
            state: CartState,
            action: PayloadAction<{ index: number }>
        ) {
            const { index } = action.payload;
            const item = state.listCart[index];

            item.quantity -= 1;

            item.price =
                priceCalculator({
                    value: item.product.price,
                    extraPrice:
                        (item.color?.extraPrice || 0) +
                        (item.capacity?.extraPrice || 0),
                    discount: item.product.discount,
                }) * item.quantity;

            if (item.quantity === 0) {
                state.listCart = state.listCart.filter(
                    (_item) => _item.quantity !== 0
                );
            }
        },

        clearCart(state: CartState) {
            state.listCart = [];
            toast.success('Đã xóa giỏ hàng !');
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
