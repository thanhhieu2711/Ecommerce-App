import Image from 'next/image';
import { Button } from '../Common';
import { useRouter } from 'next/navigation';

type Props = {
    onlyImage?: boolean;
};

export const EmptyCart = ({ onlyImage = false }: Props) => {
    // const router = useRouter();
    return (
        <div className="flex flex-col justify-center items-center relative">
            <Image
                src={'/assets/images/cart-empty.webp'}
                alt="error-image"
                width={500}
                height={500}
                objectFit="cover"
                loading="lazy"
            />
            <div className="flex flex-col items-center justify-center gap-1 absolute top-[80%]   ">
                <p className="text-primary text-lg font-semibold">
                    Giỏ hàng của bạn đang trống
                </p>{' '}
                <p className="text-black text-sm text-black/50">
                    Hãy thêm sản phẩm vào giỏ để thanh toán nhé ^^
                </p>
            </div>
            {/* {!onlyImage && (
                <Button
                    variant="solid"
                    theme="primary"
                    size="sm"
                    className="min-w-[200px] text-white"
                    onClick={() => router.push('/')}
                >
                    Mua Ngay
                </Button>
            )} */}
        </div>
    );
};

export default EmptyCart;
