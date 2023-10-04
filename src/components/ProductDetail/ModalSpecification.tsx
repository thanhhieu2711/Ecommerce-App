import React from 'react';
import { Modal } from '../Common';
import styles from './productdetail.module.css';

type Props = {
    specification: string;
    isOpen: boolean;
    handleShowAndClose: (option: boolean) => void;
};

const ModalSpecification = ({
    isOpen,
    specification,
    handleShowAndClose,
}: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            showFooter={false}
            header={'Thông số kỹ thuật'}
            onClose={() => handleShowAndClose(false)}
            containerClassname="!max-w-[600px]"
            contentContainerClassname="!px-4 !py-2"
        >
            <div
                className={styles.specifications}
                dangerouslySetInnerHTML={{ __html: specification }}
            ></div>
        </Modal>
    );
};

export default ModalSpecification;
