import { useAppSelector } from '@/stores';

function useAuthModal() {
    const isOpenLoginModal = useAppSelector(
        (state) => state.authModal.isOpenLoginModal
    );
    const isOpenRegisterModal = useAppSelector(
        (state) => state.authModal.isOpenRegisterModal
    );

    return {
        isOpenLoginModal,
        isOpenRegisterModal,
    };
}

export default useAuthModal;
