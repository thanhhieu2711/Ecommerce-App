import { ProductDetail as ProductDetailCtn } from '@/containers/Dashboard/ProductDashboard/ProductDetail';
const ProductDetail = ({ params }: { params: { productId: any } }) => {
    return <ProductDetailCtn productId={params.productId} />;
};

export default ProductDetail;
