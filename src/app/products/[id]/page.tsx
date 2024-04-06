import ProductDetailCtn from '@/containers/Product/ProductDetail';
import { TParams } from '@/types/general';
import { getNameFromSlugExcludingId } from '@/utils/helper';
import { Metadata } from 'next';
type Props = TParams;

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    return {
        title: getNameFromSlugExcludingId({ params }),
    };
};

export default function ProductDetail({ params }: Props) {
    return <ProductDetailCtn pid={params.id} />;
}
