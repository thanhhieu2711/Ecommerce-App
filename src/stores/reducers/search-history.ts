import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TSearch = {
    searchText: string;
    endPoint: string;
    date: number;
};

interface SearchHistoryState {
    listSearch: TSearch[];
}

const initialState = { listSearch: [] } as SearchHistoryState;

const searchHistorySlice = createSlice({
    name: 'sample',
    initialState,
    reducers: {
        addToSearchHistory(
            state: SearchHistoryState,
            action: PayloadAction<TSearch>
        ) {
            const index = state.listSearch.findIndex(
                (item) => item.searchText === action.payload.searchText
            );
            if (index === -1) {
                if (state.listSearch.length < 4) {
                    state.listSearch.unshift(action.payload);
                } else {
                    state.listSearch = [
                        action.payload,
                        ...state.listSearch.slice(0, 3),
                    ];
                }
            }
        },
        clearSearchHistory(state: SearchHistoryState) {
            state.listSearch = [];
        },
    },
});

export const { addToSearchHistory, clearSearchHistory } =
    searchHistorySlice.actions;
export default searchHistorySlice.reducer;
