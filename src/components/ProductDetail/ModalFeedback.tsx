import cn from 'classnames';
import { Modal } from '../Common';
import { TProductInfo } from '@/types/general';
import Image from 'next/image';
import { formatDate } from '@/utils/helper';
import { BiTime } from 'react-icons/bi';
import { Rate } from 'antd';
type Props = {
    product: TProductInfo;
    isOpen: boolean;
    handleShowAndClose: (option: boolean) => void;
};

const ModalFeedback = ({ product, handleShowAndClose, isOpen }: Props) => {
    return (
        <Modal
            // containerClassname="md:!max-w-[800px]"
            onClose={() => handleShowAndClose(false)}
            isOpen={isOpen}
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
                            index !== product.feedback?.length - 1 &&
                                'border-b border-black/5'
                        )}
                    >
                        <div
                            key={feedback.id}
                            className="flex flex-row items-center gap-3"
                        >
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src={'/assets/images/fallback_user.jpeg'}
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
    );
};

export default ModalFeedback;
