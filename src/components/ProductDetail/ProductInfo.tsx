import cn from 'classnames';
import { TCapacityInfo, TColorInfo, TProductInfo } from '@/types/general';
import { formatCurrency, priceCalculator } from '@/utils/helper';
import { Rate, Tag, Tooltip } from 'antd';
import Counter from '../Common/Counter';
import { useCart } from '@/hooks/store';

type Props = {
    product: TProductInfo;
    quantity: number;
    selectedColor: TColorInfo;
    selectedCapacity: TCapacityInfo;
    productColors: TColorInfo[];
    productCapacities: TCapacityInfo[];
    handleChangeQuantity: (quantity: number) => void;
    handleSelectColor: (color: TColorInfo) => void;
    handleSelectCapacity: (capacity: TCapacityInfo) => void;
};

export const ProductInfo = ({
    product,
    quantity,
    selectedCapacity,
    selectedColor,
    productColors,
    productCapacities,
    handleSelectCapacity,
    handleSelectColor,
    handleChangeQuantity,
}: Props) => {
    const { listCart } = useCart();

    return (
        <>
            {/* TÊN / ĐÁNH GIÁ */}
            <div className="border-b border-black/5 pb-3">
                <p className="text-xl sm:text-2xl font-semibold mb-2">
                    {product.name}
                </p>
                <div className="flex flex-row items-center gap-2 flex-wrap ">
                    <Rate
                        className="text-sm text-common-warning"
                        disabled
                        defaultValue={product.ratting}
                    />
                    <p className="text-sm text-black/50">
                        {`(${product.feedback?.length} lượt đánh giá)`}
                    </p>
                    <span className="text-black/50 text-xs ">|</span>
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
                <div className="flex flex-row items-center gap-2 flex-wrap">
                    <p className="text-xl sm:text-2xl font-bold text-black/90">
                        {formatCurrency(
                            priceCalculator({
                                value: product.price,
                                discount: product.discount,
                                extraPrice:
                                    (selectedColor?.extraPrice || 0) +
                                    (selectedCapacity?.extraPrice || 0),
                            })
                        )}
                    </p>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-md line-through text-black/50">
                            {formatCurrency(
                                priceCalculator({
                                    value: product.price,
                                    extraPrice:
                                        (selectedColor?.extraPrice || 0) +
                                        (selectedCapacity?.extraPrice || 0),
                                })
                            )}
                        </p>
                        <p className="text-sm text-primary">{`(-${
                            product.discount * 100
                        }%)`}</p>
                    </div>
                </div>
            </div>
            {/* MÀU SẮC */}
            {!!product.color.length && (
                <div className="flex flex-row items-center gap-4 flex-wrap">
                    <p className="text-sm">Màu sắc :</p>
                    <div className="flex flex-row items-center gap-2">
                        {productColors.map((color, index) => {
                            return (
                                <div
                                    key={color.id}
                                    className={cn(
                                        'p-[2px] flex flex-row items-center justify-center border-[1.5px] border-transparent rounded-full',
                                        selectedColor?.id === color?.id &&
                                            '!border-secondary-variant-2'
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
                                                handleSelectColor(color)
                                            }
                                            style={{
                                                backgroundColor: color.hexcode,
                                            }}
                                            className={`w-7 h-7 rounded-full border border-black/10 `}
                                        ></Tag.CheckableTag>
                                    </Tooltip>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* DUNG LƯỢNG */}
            {!!product.capacity.length && (
                <div className="flex flex-row items-center gap-4 flex-wrap">
                    <p className="text-sm">Dung lượng :</p>
                    <div className="flex flex-row items-center gap-3 flex-wrap">
                        {productCapacities?.map((capacity, index) => {
                            return (
                                <div
                                    onClick={() =>
                                        handleSelectCapacity(capacity)
                                    }
                                    key={capacity.id}
                                    className={cn(
                                        'text-sm rounded-lg px-3 py-1 border-[1.5px]  border-black/20 cursor-pointer',
                                        selectedCapacity?.id === capacity.id &&
                                            '!border-secondary-variant-2'
                                    )}
                                >
                                    {capacity.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* SỐ LƯỢNG */}
            <div className="flex flex-row items-center gap-4 flex-wrap">
                <p className="text-sm">Số lượng :</p>
                <Counter
                    buttonClassname="bg-secondary-variant-2 text-white border-none"
                    onChange={handleChangeQuantity}
                    handleDecrease={() => handleChangeQuantity(quantity - 1)}
                    handleIncrease={() => handleChangeQuantity(quantity + 1)}
                    defaultValue={quantity}
                    isDisableDecrease={quantity <= 1}
                    minValue={0}
                />
            </div>
        </>
    );
};

export default ProductInfo;
