import { useAppDispatch } from '@/stores';
import { openHomeSearchBoxModal } from '@/stores/reducers/modal';
import { TProductInfo } from '@/types/general';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    product: TProductInfo;
};

const TrendingProductItem = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    return (
        <Link
            href={`/product/${product.slug}-${product.id}`}
            className="flex flex-row items-center gap-2 hover:bg-[#f3f3f3] px-1 rounded-md"
            onClick={() => dispatch(openHomeSearchBoxModal(false))}
        >
            <Image
                alt="product-img"
                src={product.images[0]}
                width={40}
                height={40}
                loading="lazy"
            />
            <div key={product.id} className="line-clamp-2 text-sm">
                {product.name}
            </div>
        </Link>
    );
};

export default TrendingProductItem;
