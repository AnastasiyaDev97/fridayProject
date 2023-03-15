import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { AppStatusType } from 'common/types/AppStatus';
import { Nullable } from 'common/types/Nullable';

const initialState = {
  status: 'idle' as AppStatusType,
  isInitialized: false,
  errorText: null as Nullable<string>,
};

type InitialStateType = typeof initialState;

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (
      state: InitialStateType,
      action: PayloadAction<{ status: AppStatusType }>,
    ) => {
      state.status = action.payload.status;
    },
    setIsInitialized: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setErrorText: (
      state: InitialStateType,
      action: PayloadAction<{ errorText: Nullable<string> }>,
    ) => {
      state.errorText = action.payload.errorText;
    },
  },
});

export const { setAppStatus, setIsInitialized, setErrorText } = appSlice.actions;
export default appSlice.reducer;
