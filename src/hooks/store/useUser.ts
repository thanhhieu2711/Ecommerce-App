import { useAppSelector } from '@/stores';

function useUser() {
    const currentUser = useAppSelector((state) => state.user.info);
    return {
        currentUser,
    };
}

export default useUser;
