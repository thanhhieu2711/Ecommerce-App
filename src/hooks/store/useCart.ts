import { useAppSelector } from '@/stores';
import { priceCalculator } from '@/utils/helper';

export const useCart = () => {
    const listCart = useAppSelector((state) => state.cart.listCart);
    const cartTotal = useAppSelector((state) =>
        state.cart.listCart.reduce((acc, cur) => {
            return (acc += cur.price);
        }, 0)
    );

    const cartQuantity = useAppSelector((state) => {
        return state.cart.listCart.reduce((acc, cur) => {
            return (acc += cur.quantity);
        }, 0);
    });

    const cartSubTotal = useAppSelector((state) =>
        state.cart.listCart.reduce((acc, cur) => {
            return (acc +=
                priceCalculator({
                    value: cur.product.price,
                    extraPrice:
                        (cur?.capacity?.extraPrice || 0) +
                        (cur?.color?.extraPrice || 0),
                }) * cur.quantity);
        }, 0)
    );

    const discountTotal = useAppSelector((state) =>
        state.cart.listCart.reduce((acc, cur) => {
            const { product, capacity, color, quantity } = cur;
            return (acc +=
                (priceCalculator({
                    value: product.price,
                    extraPrice:
                        (capacity?.extraPrice || 0) + (color?.extraPrice || 0),
                }) -
                    priceCalculator({
                        value: product.price,
                        extraPrice:
                            (capacity?.extraPrice || 0) +
                            (color?.extraPrice || 0),
                        discount: product.discount,
                    })) *
                quantity);
        }, 0)
    );

    return {
        listCart,
        cartTotal,
        cartQuantity,
        cartSubTotal,
        discountTotal,
    };
};

export default useCart;
