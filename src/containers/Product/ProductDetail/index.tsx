'use client';
import { TCapacityInfo, TColorInfo, TProductInfo } from '@/types/general';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import Container from '@/components/Layout/Container';
import { formatDate, priceCalculator } from '@/utils/helper';
import { BiCartAdd, BiTime } from 'react-icons/bi';
import { Rate, Tag, Tooltip } from 'antd';
import { capacityList, colorList } from '@/utils/constants/general';
import Image from 'next/image';
import { Button, Modal } from '@/components/Common';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    Description,
    ProductImage,
    Promotion,
    Specification,
    Evaluate,
    ProductInfo,
} from '@/components/ProductDetail';

type Props = {
    pid: string;
};

const ProductDetailCtn = ({ pid }: Props) => {
    const [product, setProduct] = useState<TProductInfo>({} as TProductInfo);
    const [activeImage, setActiveImage] = useState<string>('');
    const [isExpanedDesc, setExpanedDesc] = useState<boolean>(false);
    const [isShowFeedback, setShowFeedback] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<TColorInfo>(
        {} as TColorInfo
    );
    const [selectedCapacity, setSelectedCapacity] = useState<TCapacityInfo>(
        {} as TCapacityInfo
    );
    const getProductDetail = async () => {
        const { data } = await axios.get(`/api/product/${pid}`);
        data.isSuccess && setProduct(data.data);
        !!data.data?.images?.length && setActiveImage(data.data?.images[0]);
    };

    const productColors = useMemo(() => {
        const findListColor = colorList.filter((color) =>
            product?.color?.find((_color) => _color === color.name)
        );
        setSelectedColor(findListColor[0]);
        return findListColor;
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

    useEffect(() => {
        getProductDetail();
    }, [pid]);

    return (
        <div className="h-full w-full min-h-[75vh] bg-secondary py-[25px]">
            {product && product.images && (
                <Container>
                    <div className=" grid grid-cols-4 md:row-auto gap-6 bg-white p-4 rounded-lg shadow-card">
                        {/* ẢNH SẢN PHẨM */}
                        {product.images && (
                            <ProductImage
                                activeImage={activeImage}
                                handleChangeActiveImage={setActiveImage}
                                product={product}
                            />
                        )}
                        <div className="col-span-4 md:col-span-2">
                            <div className="w-full h-full flex flex-col gap-5">
                                <ProductInfo
                                    product={product}
                                    productColors={productColors}
                                    productCapacities={productCapacities}
                                    selectedColor={selectedColor}
                                    selectedCapacity={selectedCapacity}
                                    handleSelectColor={setSelectedColor}
                                    handleSelectCapacity={setSelectedCapacity}
                                />
                                <Promotion />
                                {/* THÊM VÀO GIỎ HANG */}
                                <div className="flex flex-row items-center gap-3">
                                    <Button
                                        className="sm:basis-1/3 flex flex-row items-center  justify-center gap-2 text-lg text-secondary-variant-2
                                        hover:border-opacity-50
                                        border-secondary-variant-2
                                        "
                                        size="md"
                                        variant="outline"
                                        onClick={() => {}}
                                    >
                                        <BiCartAdd className="icon-base" />
                                        <p className="hidden sm:block">
                                            Thêm vào giỏ
                                        </p>
                                    </Button>
                                    <Button
                                        className="flex-1 text-lg text-white hover:bg-opacity-80"
                                        size="md"
                                        onClick={() => {}}
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
                                <Specification product={product} />
                            </div>
                        </div>
                        {/* ĐÁNH GIÁ SẢN PHẨM */}
                        <Evaluate
                            handleShowModalFeedback={() =>
                                setShowFeedback(!!product.feedback.length)
                            }
                            product={product}
                            ratingScaleList={ratingScaleList}
                        />
                    </div>
                </Container>
            )}
            <Modal
                containerClassname="md:!max-w-[800px]"
                onClose={() => setExpanedDesc(false)}
                isOpen={isExpanedDesc}
                header={'Mô tả chi tiết'}
                showCloseIcon={true}
                showFooter={false}
            >
                <div
                    className=" text-justify h-full overflow-clip "
                    dangerouslySetInnerHTML={{
                        __html: product.description || '',
                    }}
                />
            </Modal>
            <Modal
                // containerClassname="md:!max-w-[800px]"
                onClose={() => setShowFeedback(false)}
                isOpen={isShowFeedback}
                header={'Đánh giá và nhận xét'}
                showCloseIcon={true}
                showFooter={false}
            >
                <div className="w-full h-full flex flex-col gap-4">
                    {product.feedback?.map((feedback, index) => (
                        <div
                            key={feedback.id}
                            className={cn(
                                'flex flex-col pb-3',
                                index !== product.feedback.length - 1 &&
                                    'border-b border-black/5'
                            )}
                        >
                            <div
                                key={feedback.id}
                                className="flex flex-row items-center gap-3"
                            >
                                <div className="flex flex-row items-center gap-2">
                                    <Image
                                        src={
                                            '/assets/images/fallback_user.jpeg'
                                        }
                                        width={35}
                                        height={35}
                                        alt=""
                                    />
                                    <p className="text-lg font-medium">
                                        {feedback.user.name || 'Vô danh'}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-1 text-xs">
                                    <BiTime />
                                    <p>{formatDate(feedback.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-11">
                                <div className="flex flex-row items-center gap-2">
                                    <Rate
                                        defaultValue={feedback.ratting}
                                        className="text-common-warning text-sm"
                                    />
                                </div>
                                <p>{feedback.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ProductDetailCtn;
