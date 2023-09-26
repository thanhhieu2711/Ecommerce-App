'use client';
import { Modal } from '@/components/Common';
import { useAppDispatch } from '@/stores';
import { openRegisterModal } from '@/stores/reducers/modal';
import useModal from '@/hooks/store/useModal';
import RegisterForm from './components/RegisterForm';
export const RegisterModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenRegisterModal } = useModal();
    return (
        <Modal
            header={'Đăng ký'}
            containerClassname="!max-w-[450px]"
            contentContainerClassname="!max-h-[600px]"
            headerClassname="font-normal"
            onClose={() => dispatch(openRegisterModal(false))}
            isOpen={isOpenRegisterModal}
            showFooter={false}
        >
            <RegisterForm />
        </Modal>
    );
};

export default RegisterModal;
