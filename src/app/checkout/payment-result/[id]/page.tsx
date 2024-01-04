'use client';
import PaymentResultCtn from '@/containers/Checkout/PaymentResult';
import { useParams } from 'next/navigation';

export default function PaymentResult() {
    const { id } = useParams();
    return <PaymentResultCtn orderId={id as string} />;
}
