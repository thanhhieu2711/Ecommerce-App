'use client';
import { Modal } from '@/components/Common';

import LoginForm from './components/LoginForm';
import { useAppDispatch } from '@/stores';
import { openLoginModal } from '@/stores/reducers/authModal';
import useAuthModal from '@/hooks/store/useAuthModal';
export const LoginModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenLoginModal } = useAuthModal();
    return (
        <Modal
            header={'Đăng nhập'}
            containerClassname="!max-w-[450px]"
            headerClassname="font-normal"
            onClose={() => dispatch(openLoginModal(false))}
            isOpen={isOpenLoginModal}
            showFooter={false}
        >
            <LoginForm />
        </Modal>
    );
};

export default LoginModal;
