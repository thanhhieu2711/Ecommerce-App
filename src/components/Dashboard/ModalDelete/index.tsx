import { Modal, Spinner } from '@/components/Common';
import { Button } from '@/components/Common';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
type Props = {
    isShow: boolean;
    onClose: () => void;
    onOk: () => void;
    title: string;
    subTitle?: string;
    loadingSubmit?: boolean;
};

const ModalDelete = ({
    isShow,
    onClose,
    onOk,
    title,
    subTitle,
    loadingSubmit,
}: Props) => {
    return (
        <Modal
            isOpen={isShow}
            onClose={loadingSubmit ? () => {} : onClose}
            showFooter={false}
            containerClassname="!max-w-[420px]"
        >
            <div className="flex flex-col gap-4">
                <div className="ml-auto cursor-pointer" onClick={onClose}>
                    <AiOutlineClose className="icon-base !w-4 !h-4" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-md font-semibold">{title}</p>
                    {subTitle && (
                        <p className="text-sm text-black/50">{subTitle}</p>
                    )}
                </div>
                <Button
                    className="!bg-red-600 min-w-[80px] text-white text-sm font-medium ml-auto"
                    onClick={onOk}
                >
                    {loadingSubmit ? (
                        <Spinner color="text-white/30" fillActive="white" />
                    ) : (
                        'Xóa'
                    )}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalDelete;
