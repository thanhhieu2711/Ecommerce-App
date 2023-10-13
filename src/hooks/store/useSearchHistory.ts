import { useAppSelector } from '@/stores';

function useSearchHistory() {
    const searchHistory = useAppSelector(
        (state) => state.searchHistory.listSearch
    );

    return {
        searchHistory,
    };
}

export default useSearchHistory;
