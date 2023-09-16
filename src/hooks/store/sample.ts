import { useAppSelector } from '@/stores';

function useSammple() {
    const sampleStore = useAppSelector((state) => state.sample.value);

    return {
        sampleStore,
    };
}

export default useSammple;
