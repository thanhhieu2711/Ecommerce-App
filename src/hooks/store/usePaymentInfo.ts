import { useAppSelector } from '@/stores';
import { useCart } from '.';

export const usePaymentInfo = () => {
    const { cartTotal } = useCart();

    const shippingService = useAppSelector(
        (state) => state.paymentInfo.shippingService
    );
    const total = useAppSelector((state) =>
        !!state.cart.listCart.length
            ? cartTotal + (shippingService?.fee || 0)
            : 0
    );

    return {
        shippingService,
        total,
    };
};

export default usePaymentInfo;
