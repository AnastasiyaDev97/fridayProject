import { cardsAPI } from '../../dal/cards/cardsAPI';
import { getCardsQueryParamsType, updateCardType } from '../../dal/cards/types';
import { STATUS } from '../../enums/StatusType';
import { catchErrorHandler } from '../../utils/error-utils';
import { setAppStatusAC } from '../reducers/app-reducer';
import { setCardsAC, setCardsRatingAC } from '../reducers/cards-reducer';
import { AppDispatch, ThunkType } from '../store';

export const getCardsTC =
  (getCardsQueryParams: getCardsQueryParamsType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      const data = await cardsAPI.getCards(getCardsQueryParams);

      dispatch(setCardsAC(data));
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const addCardTC =
  (cardsPack_id: string, question: string, answer: string): ThunkType =>
  async dispatch => {
    try {
      const card = {
        cardsPack_id,
        question,
        answer,
      };

      dispatch(setAppStatusAC(STATUS.LOADING));
      await cardsAPI.addCard({ card });
      await dispatch(getCardsTC({ cardsPack_id }));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const deleteCardTC =
  (cardsPack_id: string, id: string): ThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      await cardsAPI.deleteCard(id);
      await dispatch(getCardsTC({ cardsPack_id }));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const updateCardTC =
  (cardsPack_id: string, { _id, ...rest }: updateCardType): ThunkType =>
  async dispatch => {
    try {
      const card = {
        _id,
        ...rest,
      };

      dispatch(setAppStatusAC(STATUS.LOADING));
      await cardsAPI.updateCard({ card });
      await dispatch(getCardsTC({ cardsPack_id }));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const updateCardRatingTC =
  (newGrade: number, card_id: string): ThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      let { _id, grade, shots } = await cardsAPI.updateCardGrade(newGrade, card_id);

      dispatch(setCardsRatingAC(_id, grade, shots));
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
