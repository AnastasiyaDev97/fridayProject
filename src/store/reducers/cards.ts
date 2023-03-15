import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CardType, getCardsResponseType } from '../../dal/cards/types';

const initialState = {
  cards: [] as Array<CardType>,
  /* cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 7,
  packUserId: EMPTY_STRING,
  sortCards: '0updated', */
};

type InitialStateType = typeof initialState;

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardData: (
      state: InitialStateType,
      action: PayloadAction<getCardsResponseType>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state = action.payload;
    },
    setCardRating: (
      state: InitialStateType,
      action: PayloadAction<{ _id: string; grade: number; shots: number }>,
    ) => {
      const currenrCard = state.cards?.find(({ _id }) => _id === action.payload._id);

      if (currenrCard) {
        currenrCard.grade = action.payload.grade;
        currenrCard.shots = action.payload.shots;
      }
    },
  },
});

export const { setCardData, setCardRating } = cardsSlice.actions;
export default cardsSlice.reducer;
