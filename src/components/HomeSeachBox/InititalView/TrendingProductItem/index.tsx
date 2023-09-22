import { TProductInfo } from '@/types/general';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    product: TProductInfo;
};

const TrendingProductItem = ({ product }: Props) => {
    return (
        <Link
            href={''}
            className="flex flex-row items-center gap-2 hover:bg-[#f3f3f3] px-1 rounded-md"
        >
            <Image
                alt="product-img"
                src={product.images[0]}
                width={40}
                height={40}
                loading="lazy"
            />
            <div key={product.id} className="line-clamp-1">
                {product.name}
            </div>
        </Link>
    );
};

export default TrendingProductItem;
