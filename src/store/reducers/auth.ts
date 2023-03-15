import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
};

type InitialStateType = typeof initialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginStatus: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setRegisterStatus: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.isRegistered = action.payload;
    },
  },
});

export const { setLoginStatus, setRegisterStatus } = authSlice.actions;
export default authSlice.reducer;
