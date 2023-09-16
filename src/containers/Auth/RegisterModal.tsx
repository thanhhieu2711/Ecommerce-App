'use client';
import { Modal } from '@/components/Common';
import { useAppDispatch } from '@/stores';
import { openRegisterModal } from '@/stores/reducers/authModal';
import useAuthModal from '@/hooks/store/useAuthModal';
import RegisterForm from './components/RegisterForm';
export const RegisterModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenRegisterModal } = useAuthModal();
    return (
        <Modal
            header={'Đăng ký'}
            containerClassname="!max-w-[450px]"
            contentContainerClassname="!max-h-[600px]"
            headerClassname="font-normal"
            onClose={() => dispatch(openRegisterModal(false))}
            isOpen={isOpenRegisterModal}
        >
            <RegisterForm />
        </Modal>
    );
};

export default RegisterModal;
