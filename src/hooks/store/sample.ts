import { useAppSelector } from '@/stores';

export const useSammple = () => {
    const sampleStore = useAppSelector((state) => state.sample.value);

    return {
        sampleStore,
    };
};

export default useSammple;
