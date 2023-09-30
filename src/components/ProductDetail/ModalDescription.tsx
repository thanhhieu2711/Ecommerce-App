import { TProductInfo } from '@/types/general';
import React from 'react';
import { Modal } from '../Common';

type Props = {
    product: TProductInfo;
    isOpen: boolean;
    handleShowAnhClose: (option: boolean) => void;
};

export const ModalDescription = ({
    product,
    isOpen,
    handleShowAnhClose,
}: Props) => {
    return (
        <Modal
            containerClassname="md:!max-w-[800px]"
            onClose={() => handleShowAnhClose(false)}
            isOpen={isOpen}
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
    );
};

export default ModalDescription;
