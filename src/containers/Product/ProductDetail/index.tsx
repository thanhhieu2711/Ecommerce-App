'use client';
import { TCapacityInfo, TColorInfo, TProductInfo } from '@/types/general';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Container from '@/components/Layout/Container';
import { priceCalculator } from '@/utils/helper';
import { BiCartAdd } from 'react-icons/bi';
import { capacityList, colorList } from '@/utils/constants/general';
import { Button } from '@/components/Common';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    Description,
    ProductImage,
    Promotion,
    Specification,
    ProductInfo,
    ModalDescription,
    Feedback,
    ModalPromotion,
    Warranty,
} from '@/components/ProductDetail';
import { useAppDispatch } from '@/stores';
import { addToCart } from '@/stores/reducers/cart';
import ModalFeedback from '@/components/ProductDetail/ModalFeedback';
import ModalSpecification from '@/components/ProductDetail/ModalSpecification';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/store';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { openLoginModal } from '@/stores/reducers/modal';
import ProductSection from '@/components/Product/ProductSection';

type Props = {
    pid: string;
};

const ProductDetailCtn = ({ pid }: Props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { listCart } = useCart();
    const { data } = useSession();
    const [product, setProduct] = useState<
        TProductInfo & {
            isExist?: boolean;
        }
    >(
        {} as TProductInfo & {
            isExist?: boolean;
        }
    );
    const [activeImage, setActiveImage] = useState<string>('');
    const [isExpanedDesc, setExpanedDesc] = useState<boolean>(false);
    const [isShowFeedback, setShowFeedback] = useState<boolean>(false);
    const [isShowPromotion, setShowPromotion] = useState<boolean>(false);
    const [isExpanedSpecification, setExpanedSpecification] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<TColorInfo>(
        {} as TColorInfo
    );
    const [selectedCapacity, setSelectedCapacity] = useState<TCapacityInfo>(
        {} as TCapacityInfo
    );
    const [quantity, setQuantity] = useState<number>(1);

    const getProductDetail = async () => {
        try {
            const { data } = await axios.get(`/api/products/${pid}`);
            if (data.isSuccess) {
                setProduct({ ...data.data, isExist: data.isSuccess });
                !!data.data?.images?.length &&
                    setActiveImage(data.data?.images[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const productColors = useMemo(() => {
        const colors = colorList.filter((color) =>
            product?.color?.find((_color) => _color === color.name)
        );
        setSelectedColor(colors[0]);
        return colors;
    }, [product]);

    const productCapacities = useMemo(() => {
        const findListCapacity = capacityList.filter((cap) =>
            product?.capacity?.find((_cap) => _cap === cap.name)
        );
        setSelectedCapacity(findListCapacity[0]);
        return findListCapacity;
    }, [product]);

    const ratingScaleList = useMemo(() => {
        const tempArr = [
            {
                ratingScale: 5,
                ratingTurn: 0,
            },
            {
                ratingScale: 4,
                ratingTurn: 0,
            },
            {
                ratingScale: 3,
                ratingTurn: 0,
            },
            {
                ratingScale: 2,
                ratingTurn: 0,
            },
            {
                ratingScale: 1,
                ratingTurn: 0,
            },
        ];
        for (let i = 0; i < product.feedback?.length; i++) {
            const index = tempArr.findIndex(
                (item) => item.ratingScale === product.feedback[i]?.ratting
            );
            tempArr[index].ratingTurn += 1;
        }
        return tempArr;
    }, [product]);

    const checkoutInfo = {
        product: product,
        capacity: selectedCapacity,
        color: selectedColor,
        quantity: quantity,
        price: priceCalculator({
            value: product.price * quantity,
            extraPrice:
                (selectedColor?.extraPrice || 0) +
                (selectedCapacity?.extraPrice || 0),
            discount: product.discount,
        }),
    };

    const handlePrecheckAddToCart = () => {
        if (!!data) {
            const index = listCart.findIndex(
                (item) => item.product.id === product.id
            );
            if (index === -1) {
                dispatch(addToCart(checkoutInfo));
            }
            return router.push('/checkout');
        }
        return dispatch(openLoginModal(true));
    };

    useEffect(() => {
        setLoading(true);
        getProductDetail();
    }, [pid]);

    return (
        <div className=" h-full w-full min-h-[75vh] bg-white py-[25px]">
            <Container>
                {product.isExist && !loading && (
                    <>
                        <div className=" grid grid-cols-4 md:row-auto gap-6 bg-white p-4 rounded-lg shadow-card">
                            <div className="col-span-4 md:col-span-2 flex flex-col">
                                {/* ẢNH SẢN PHẨM */}
                                {product.images && (
                                    <ProductImage
                                        activeImage={activeImage}
                                        handleChangeActiveImage={setActiveImage}
                                        product={product}
                                    />
                                )}
                                <Warranty />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <div className="w-full h-full flex flex-col gap-5">
                                    <ProductInfo
                                        product={product}
                                        quantity={quantity}
                                        productColors={productColors}
                                        productCapacities={productCapacities}
                                        selectedColor={selectedColor}
                                        selectedCapacity={selectedCapacity}
                                        handleSelectColor={setSelectedColor}
                                        handleSelectCapacity={
                                            setSelectedCapacity
                                        }
                                        handleChangeQuantity={setQuantity}
                                    />
                                    <Promotion
                                        handleShowPromotionModal={() =>
                                            setShowPromotion(true)
                                        }
                                    />
                                    {/* THÊM VÀO GIỎ HANG */}
                                    <div className="flex flex-row items-center gap-3">
                                        <Button
                                            className="sm:basis-2/5 flex flex-row items-center justify-center gap-2 text-lg text-secondary-variant-2 hover:border-opacity-70 hover:text-opacity-70 hover:border-secondary-variant-2 border-secondary-variant-2"
                                            size="md"
                                            variant="outline"
                                            disabled={
                                                product.status !== 'AVAILABLE'
                                            }
                                            onClick={() => {
                                                toast.success(
                                                    'Đã thêm vào giỏ hàng !'
                                                );
                                                dispatch(
                                                    addToCart(checkoutInfo)
                                                );
                                            }}
                                        >
                                            <BiCartAdd className="icon-base" />
                                            <p className="hidden sm:block">
                                                Thêm vào giỏ
                                            </p>
                                        </Button>
                                        <Button
                                            className="flex-1 text-lg text-white hover:!bg-primary  hover:opacity-70"
                                            size="md"
                                            disabled={
                                                product.status !== 'AVAILABLE'
                                            }
                                            onClick={() =>
                                                handlePrecheckAddToCart()
                                            }
                                        >
                                            <p>Mua ngay</p>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px col-span-4 border-b border-black/10"></div>
                            {/* MÔ TẢ / THÔNG SỐ */}
                            <div className="col-span-4">
                                <div className="grid grid-cols-5 gap-8 grid-flow-dense row-auto ">
                                    <Description
                                        product={product}
                                        handleExpanedDesc={() =>
                                            setExpanedDesc(true)
                                        }
                                    />
                                    <Specification
                                        product={product}
                                        handleExpanedSpecification={() =>
                                            setExpanedSpecification(true)
                                        }
                                    />
                                </div>
                            </div>
                            {/* ĐÁNH GIÁ SẢN PHẨM */}
                            <Feedback
                                handleShowModalFeedback={() =>
                                    setShowFeedback(!!product.feedback.length)
                                }
                                product={product}
                                ratingScaleList={ratingScaleList}
                            />
                        </div>

                        <div className="flex flex-col gap-4 my-10">
                            <ProductSection
                                category={product.category}
                                categoryNameModifier="SẢN PHẨM LIÊN QUAN"
                            />
                            {['Tablet', 'Điện Thoại', 'Laptop'].includes(
                                product.category?.name
                            ) && (
                                <ProductSection
                                    category={{
                                        ...product.category,
                                        id: '65993bf6850a1a7d7e81e006',
                                    }}
                                    categoryNameModifier="PHỤ KIỆN ĐI KÈM"
                                />
                            )}
                        </div>

                        <ModalDescription
                            isOpen={isExpanedDesc}
                            handleShowAnhClose={setExpanedDesc}
                            product={product}
                        />
                        <ModalFeedback
                            isOpen={isShowFeedback}
                            handleShowAndClose={setShowFeedback}
                            product={product}
                        />
                        <ModalPromotion
                            isOpen={isShowPromotion}
                            handleShowAndClose={setShowPromotion}
                        />
                        <ModalSpecification
                            isOpen={isExpanedSpecification}
                            handleShowAndClose={setExpanedSpecification}
                            specification={product.specifications}
                        />
                    </>
                )}
            </Container>
        </div>
    );
};

export default ProductDetailCtn;
