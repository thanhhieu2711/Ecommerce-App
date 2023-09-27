'use client';
import ProductDetailCtn from '@/containers/Products/ProductDetail';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
    const { id } = useParams();
    return <ProductDetailCtn pid={id as string} />;
}
