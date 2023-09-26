'use client';
import ProductDetailCtn from '@/containers/Products/ProductDetail';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
    const { id } = useParams();
    console.log(id);
    return <ProductDetailCtn pid={id as string} />;
}
