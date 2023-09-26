'use client';
import { TCapacityInfo, TColorInfo, TProductInfo } from '@/types/general';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import styles from './productdetail.module.css';
import cn from 'classnames';
import Container from '@/components/Layout/Container';
import { priceCalculator } from '@/utils/helper';
import { BiGift } from 'react-icons/bi';
import { TbDiscountCheck } from 'react-icons/tb';
import { Rate, Tag, Tooltip } from 'antd';
import { capacityList, colorList } from '@/utils/constants/general';
import Image from 'next/image';
import { Button, Modal } from '@/components/Common';
type Props = {
    pid: string;
};

const ProductDetailCtn = ({ pid }: Props) => {
    const [product, setProduct] = useState<TProductInfo>({} as TProductInfo);
    const [activeImage, setActiveImage] = useState<string>('');
    const [isExpanedDesc, setExpanedDesc] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<TColorInfo>(
        {} as TColorInfo
    );
    const [selectedCapacity, setSelectedCapacity] = useState<TCapacityInfo>(
        {} as TCapacityInfo
    );
    const getProductDetail = async () => {
        const { data } = await axios.get(`/api/product/${pid}`);
        console.log(data);
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

    useEffect(() => {
        getProductDetail();
    }, [pid]);

    return (
        <div className="h-full w-full min-h-[75vh] bg-secondary py-[25px]">
            {product && product.images && (
                <Container>
                    <div className=" grid grid-cols-4 md:row-auto gap-6 bg-white p-4 rounded-lg shadow-card">
                        {product.images && (
                            <div className="col-span-4 md:col-span-2 ">
                                <div className="flex flex-row gap-2 h-full md:max-h-[450px]">
                                    <div className="flex flex-col justify-between  basis-[15.5%] sm:basis-[15.7%] md:basis-[15%] h-full">
                                        {product.images.map((image) => (
                                            <div
                                                key={image}
                                                className={cn(
                                                    'cursor-pointer border border-black/10 rounded-lg ',
                                                    image === activeImage &&
                                                        'border-primary '
                                                )}
                                                onClick={() =>
                                                    setActiveImage(image)
                                                }
                                            >
                                                <Image
                                                    width={80}
                                                    height={80}
                                                    src={image}
                                                    loading="lazy"
                                                    alt="product-image"
                                                    className="p-1 rounded-lg w-full h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex-1 rounded-lg border border-black/10">
                                        <img
                                            src={activeImage}
                                            className="object-contain w-full h-full rounded-lg"
                                            alt=""
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-span-4 md:col-span-2">
                            <div className="w-full h-full flex flex-col gap-3">
                                {/* TÊN / ĐÁNH GIÁ */}
                                <div className="border-b border-black/5 pb-3">
                                    <p className="text-2xl font-medium">
                                        {product.name}
                                    </p>
                                    <div className="flex flex-row items-center gap-2 flex-wrap ">
                                        <Rate
                                            className="text-sm text-common-warning"
                                            disabled
                                            defaultValue={product.rattting}
                                        />
                                        <p className="text-sm text-black/50">
                                            (0 lượt đánh giá)
                                        </p>
                                        <span className="text-black/50 text-xs ">
                                            |
                                        </span>
                                        <p
                                            className={cn(
                                                'text-sm ',
                                                product.status === 'AVAILABLE'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            )}
                                        >
                                            {product.status === 'AVAILABLE'
                                                ? 'Còn hàng'
                                                : 'Hết hàng'}
                                        </p>
                                        <p></p>
                                    </div>
                                </div>

                                {/* GIÁ BÁN */}
                                <div className="flex flex-row items-center gap-4 flex-wrap">
                                    <p className="text-sm">Giá niêm yết : </p>
                                    <p className="text-2xl font-bold text-primary">
                                        {priceCalculator(
                                            product.price -
                                                product.price *
                                                    product.discount,
                                            selectedColor?.extraPrice +
                                                selectedCapacity?.extraPrice
                                        )}
                                    </p>
                                    <p className="text-md line-through text-black/50">
                                        {priceCalculator(
                                            product.price,
                                            selectedColor?.extraPrice +
                                                selectedCapacity?.extraPrice
                                        )}
                                    </p>
                                </div>
                                {/* MÀU SẮC */}
                                <div className="flex flex-row items-center gap-4 flex-wrap">
                                    <p className="text-sm">Màu sắc :</p>
                                    <div className="flex flex-row items-center gap-2">
                                        {productColors.map((color, index) => {
                                            return (
                                                <div
                                                    key={color.id}
                                                    className={cn(
                                                        'p-[2px] flex flex-row items-center justify-center border-2 border-transparent rounded-full',
                                                        selectedColor?.id ===
                                                            color?.id &&
                                                            '!border-primary'
                                                    )}
                                                >
                                                    <Tooltip
                                                        title={color.name}
                                                        key={color.id}
                                                        className="mx-auto"
                                                    >
                                                        <Tag.CheckableTag
                                                            checked
                                                            onChange={() =>
                                                                setSelectedColor(
                                                                    color
                                                                )
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    color.hexcode,
                                                            }}
                                                            className={`w-7 h-7 rounded-full border border-black/10 `}
                                                        ></Tag.CheckableTag>
                                                    </Tooltip>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* DUNG LƯỢNG */}
                                {product.capacity && (
                                    <div className="flex flex-row items-center gap-4 flex-wrap">
                                        <p className="text-sm">Dung lượng :</p>
                                        <div className="flex flex-row items-center gap-3 flex-wrap">
                                            {productCapacities?.map(
                                                (capacity, index) => {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                setSelectedCapacity(
                                                                    capacity
                                                                )
                                                            }
                                                            key={capacity.id}
                                                            className={cn(
                                                                'text-sm rounded-lg px-3 py-1 border border-black/20 cursor-pointer',
                                                                selectedCapacity?.id ===
                                                                    capacity.id &&
                                                                    '!border-primary'
                                                            )}
                                                        >
                                                            {capacity.name}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* ƯU ĐÃI */}
                                <div className="flex flex-col gap-2 p-4 rounded-lg border border-black/10">
                                    <div className="flex flex-row items-center gap-2">
                                        <BiGift className="icon-base !w-5 !h-5" />
                                        <p className="font-semibold text-sm">
                                            Chương trình khuyến mãi
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 pl-7">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-red-600 text-sm font-semibold">
                                                Ưu đãi sinh viên
                                            </p>
                                            <div className="flex flex-row items-center gap-2">
                                                <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                                                <p className="text-sm">
                                                    Giảm 200.000đ cho khách hàng
                                                    là HS-SV
                                                </p>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                                                <p className="text-sm">
                                                    Thi tốt quà to - Đỗ cao giảm
                                                    khủng đến 500.000đ
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-red-600 text-sm font-semibold">
                                                Ưu đãi mua kèm
                                            </p>
                                            <div className="flex flex-row items-center gap-2">
                                                <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                                                <p className="text-sm">
                                                    Mua nhiều giảm sâu, giảm đến
                                                    200.000đ khi mua phụ kiện
                                                </p>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                                                <p className="text-sm">
                                                    Giảm thêm 200.000đ khi mua
                                                    kèm gói bảo hành VIP tại cửa
                                                    hàng
                                                </p>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <TbDiscountCheck className="!w-5 !h-5 text-green-600" />
                                                <p className="text-sm">
                                                    Giảm thêm 500.000đ khi mua
                                                    kèm gói Microsoft Office 365
                                                    Personal
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p
                                        className="sm:hidden ml-auto text-sm text-common-info cursor-pointer"
                                        onClick={() => {}}
                                    >
                                        Chi tiết
                                    </p> */}
                                </div>
                                {/* THÊM VÀO GIỎ HANG */}
                                {
                                    <Button
                                        className="text-lg font-medium text-white hover:bg-opacity-80"
                                        size="md"
                                        onClick={() => {}}
                                    >
                                        <p>Thêm vào giỏ hàng</p>
                                    </Button>
                                }
                            </div>
                        </div>
                        <div className="h-px col-span-4 border-b border-black/10"></div>
                        {/* MÔ TẢ / THÔNG SỐ */}
                        <div className="col-span-4">
                            <div className="grid grid-cols-5 gap-8 grid-flow-dense row-auto ">
                                <div className="col-span-5 md:col-span-3">
                                    <div className="w-full h-full flex flex-col gap-4 relative">
                                        <p className="text-2xl font-medium">
                                            Mô tả chi tiết
                                        </p>
                                        <div
                                            className=" text-justify h-full max-h-[900px] overflow-clip "
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    product.description || '',
                                            }}
                                        />
                                        <div className="absolute bg-white bottom-0 right-0 left-0 flex flex-row justify-center">
                                            <div className="absolute w-full backdrop-blur-sm  h-5 top-0 -translate-y-full"></div>
                                            <Button
                                                onClick={() =>
                                                    setExpanedDesc(true)
                                                }
                                                className="mt-1 min-w-[150px] sm:min-w-[300px] border-black/50 hover:border-black/10"
                                                size="md"
                                                theme="white"
                                                variant="outline"
                                            >
                                                Nhấn để xem thêm
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-5 md:col-span-2">
                                    <div className="w-full h-full flex flex-col gap-4">
                                        <p className="text-2xl font-medium">
                                            Thông số kỹ thuật
                                        </p>
                                        <div
                                            className={cn(
                                                'text-justify border border-black/10',

                                                styles.specifications
                                            )}
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    product.specifications ||
                                                    '',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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
        </div>
    );
};

export default ProductDetailCtn;
