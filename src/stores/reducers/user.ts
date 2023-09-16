import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserInfo } from '@/types/user';
interface userState {
    info: TUserInfo;
}

const initialState = {} as userState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state: userState, action: PayloadAction<userState['info']>) {
            state.info = action.payload;
        },
        resetUser(state: userState) {
            state.info = {} as TUserInfo;
        },
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
