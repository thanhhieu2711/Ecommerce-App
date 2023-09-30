import { TProductInfo } from '@/types/general';
import { Progress, Rate } from 'antd';
import { BiCommentCheck } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa6';

type Props = {
    product: TProductInfo;
    ratingScaleList: {
        ratingScale: number;
        ratingTurn: number;
    }[];
    handleShowModalFeedback: () => void;
};

export const Feedback = ({
    product,
    ratingScaleList,
    handleShowModalFeedback,
}: Props) => {
    return (
        <div className="col-span-4">
            <div className="grid grid-cols-5 ">
                <div className="col-span-5 md:col-span-3">
                    <div className="flex flex-col gap-5 rounded-lg border border-black/10 p-4">
                        <div className="flex flex-row items-center gap-3">
                            <BiCommentCheck className="icon-base" />
                            <p className="text-md font-medium">
                                {`Đánh giá và nhận xét - ${product.name}`}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className=" flex-1 w-full md:flex-initial md:basis-1/3 flex flex-col items-center justify-center border-black/10 pb-5 border-b md:border-b-0 md:border-r md:pr-5 md:pb-0 ">
                                <p className="text-lg font-medium">
                                    {product.ratting || 0}/5
                                </p>
                                <Rate
                                    disabled
                                    defaultValue={product.ratting}
                                    className=" text-common-warning"
                                />
                                <p
                                    className="text-center text-md text-secondary-variant-2 mt-1 cursor-pointer"
                                    onClick={() => handleShowModalFeedback()}
                                >
                                    {!!product.feedback.length
                                        ? `(${product.feedback.length} lượt đánh giá , nhấn vào để
                          xem )`
                                        : `(0 lượt đánh giá)`}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 w-full pl-5 mt-5 md:mt-0">
                                <div className=" w-full flex flex-col gap-2">
                                    {ratingScaleList.map((item) => (
                                        <div
                                            key={item.ratingScale}
                                            className="flex flex-row items-center gap-2"
                                        >
                                            <div className="flex flex-row items-center gap-1">
                                                <p className="text-sm font-medium">
                                                    {item.ratingScale}
                                                </p>
                                                <FaStar className="!w-4 !h-4 text-common-warning" />
                                            </div>
                                            <Progress
                                                className="mb-0"
                                                key={item.ratingScale}
                                                percent={item.ratingTurn}
                                                showInfo={false}
                                                strokeColor={'#fe3564'}
                                            />
                                            <p className="text-xs min-w-fit">
                                                {item.ratingTurn} đánh giá
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
