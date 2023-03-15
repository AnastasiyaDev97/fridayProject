import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getPacksResponseType, PackType } from '../../dal/packs/types';

const initialState = {
  cardPacks: [] as Array<PackType>,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  min: 0,
  max: 0,
  pageCount: 7,
};

type InitialStateType = typeof initialState;

export const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPackData: (
      state: InitialStateType,
      action: PayloadAction<getPacksResponseType>,
    ) => {
      state = action.payload;
    },
    setMinCardsCount: (state: InitialStateType, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload;
    },
    setMaxCardsCount: (state: InitialStateType, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload;
    },
  },
});

export const { setPackData, setMaxCardsCount, setMinCardsCount } = packsSlice.actions;
export default packsSlice.reducer;
