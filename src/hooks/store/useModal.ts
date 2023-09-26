import { useAppSelector } from '@/stores';

function useModal() {
    const isOpenLoginModal = useAppSelector(
        (state) => state.modal.isOpenLoginModal
    );
    const isOpenRegisterModal = useAppSelector(
        (state) => state.modal.isOpenRegisterModal
    );
    const isOpenHomeSearchBoxModal = useAppSelector(
        (state) => state.modal.isOpenHomeSearchBoxModal
    );

    return {
        isOpenLoginModal,
        isOpenRegisterModal,
        isOpenHomeSearchBoxModal,
    };
}

export default useModal;
