import { useAppSelector } from '@/stores';

export const usePaymentInfo = () => {
    const shippingService = useAppSelector(
        (state) => state.paymentInfo.shippingService
    );
    const total = useAppSelector((state) => state.paymentInfo.total);

    return {
        shippingService,
        total,
    };
};

export default usePaymentInfo;
