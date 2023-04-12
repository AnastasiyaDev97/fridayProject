import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { EMPTY_STRING } from '../../constants';

import { UserType } from 'dal/users/types';

const initialState = {
  avatar: '',
  email: EMPTY_STRING,
  name: EMPTY_STRING,
  publicCardPacksCount: 0,
  _id: EMPTY_STRING,
};

type InitialStateType = typeof initialState;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state: InitialStateType, action: PayloadAction<UserType>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
