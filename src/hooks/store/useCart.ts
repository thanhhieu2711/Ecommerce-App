import { useAppSelector } from '@/stores';

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
    return {
        listCart,
        cartTotal,
        cartQuantity,
    };
};

export default useCart;
