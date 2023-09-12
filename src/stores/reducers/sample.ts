import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SampleState {
    value: number;
}

const initialState = { value: 0 } as SampleState;

const sampleSlice = createSlice({
    name: 'sample',
    initialState,
    reducers: {
        updateValue(state: SampleState, action: PayloadAction<number>) {
            state.value = action.payload;
        },
    },
});

export const { updateValue } = sampleSlice.actions;
export default sampleSlice.reducer;
