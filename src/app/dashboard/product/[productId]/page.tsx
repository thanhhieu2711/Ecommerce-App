import { ProductDetail as ProductDetailCtn } from '@/containers/Dashboard/Product/ProductDetail';
export default function ProductDetail({
    params,
}: {
    params: { productId: any };
}) {
    return <ProductDetailCtn productId={params.productId} />;
}
