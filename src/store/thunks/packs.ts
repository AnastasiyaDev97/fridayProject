import { AppDispatch, RootReducerType, ThunkType } from '../store';
import { getPacksQueryParamsType } from '../../dal/packs/types';
import { packsAPI } from '../../dal/packs/packsAPI';
import { setAppStatusAC } from '../reducers/app-reducer';
import { STATUS } from '../../enum/StatusType';
import { catchErrorHandler } from '../../utils/error-utils';
import {
  changePageAC,
  setNewMinMaxValues,
  setPacksAC,
  setSortingFilter,
} from '../reducers/packs-reducer';
import { pageCountNumber } from '../../constants';
import { Nullable } from 'types/Nullable';

export const getPacksTC =
  (actualPackName?: Nullable<string>) =>
  async (dispatch: AppDispatch, getState: () => RootReducerType) => {
    const { min, max, page, user_id, sortPacks } = getState().packs;
    const paramsForQuery: getPacksQueryParamsType = {
      min,
      max,
      sortPacks,
      page,
      pageCount: pageCountNumber,
      user_id,
      packName: actualPackName,
    };

    try {
      dispatch(setAppStatusAC(STATUS.LOADING));

      const data = await packsAPI.getPacks(paramsForQuery);
      dispatch(setPacksAC(data));
    } catch (err) {
      catchErrorHandler(dispatch, err);
    } finally {
      dispatch(setAppStatusAC(STATUS.SUCCEEDED));
    }
  };

export const addPackTC =
  (name: string): ThunkType =>
  async (dispatch, getState: () => RootReducerType) => {
    const { maxCardsCount } = getState().packs;
    try {
      const cardsPack = {
        name,
      };
      dispatch(setAppStatusAC(STATUS.LOADING));
      await packsAPI.addPack({ cardsPack });
      dispatch(setSortingFilter('0updated'));
      dispatch(setNewMinMaxValues(0, maxCardsCount));
      dispatch(changePageAC(1));
      await dispatch(getPacksTC());
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const deletePackTC =
  (packId: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC(STATUS.LOADING));
      await packsAPI.deletePack(packId);
      await dispatch(getPacksTC());
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };

export const updatePackTC =
  (packId: string, newName: string): ThunkType =>
  async (dispatch) => {
    try {
      const cardsPack = {
        _id: packId,
        name: newName,
      };
      dispatch(setAppStatusAC(STATUS.LOADING));
      await packsAPI.updatePack({ cardsPack });
      await dispatch(getPacksTC());
    } catch (err) {
      catchErrorHandler(dispatch, err);
    }
  };
