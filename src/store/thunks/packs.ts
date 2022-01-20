import {AppDispatch, RootReducerType, ThunkType} from "../store";
import {getPacksQueryParamsType} from "../../dal/packs/types";
import {packsAPI} from "../../dal/packs/packsAPI";
import {setAppStatusAC} from "../reducers/app-reducer";
import {STATUS} from "../../enum/StatusType";
import {catchErrorHandler} from "../../utils/error-utils";
import {setPacksAC} from "../reducers/packs-reducer";
import {pageCountNumber} from "../../constants";

export const getPacksTC = () => async (dispatch: AppDispatch, getState: () => RootReducerType) => {
    const {min, max, page, user_id, sortPacks, packName} = getState().packs
    let paramsForQuery: getPacksQueryParamsType = {
        min,
        max,
        sortPacks,
        page,
        pageCount: pageCountNumber,
        user_id,
        packName
    }

    try {
        const data = await packsAPI.getPacks(paramsForQuery)
        dispatch(setAppStatusAC(STATUS.LOADING))
        dispatch(setPacksAC(data))

    } catch (err) {
        catchErrorHandler(dispatch, err)
    } finally {
        dispatch(setAppStatusAC(STATUS.SUCCEEDED))
    }
}

export const addPackTC = (name: string): ThunkType =>
    async (dispatch) => {
        try {
            const cardsPack = {
                name,
            }
            dispatch(setAppStatusAC(STATUS.LOADING))
            await packsAPI.addPack({cardsPack})
            await dispatch(getPacksTC())
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const deletePackTC = (packId: string): ThunkType =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC(STATUS.LOADING))
            await packsAPI.deletePack(packId)
            await dispatch(getPacksTC())
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const updatePackTC = (packId: string, newName: string): ThunkType =>
    async (dispatch) => {
        try {
            const cardsPack = {
                _id: packId,
                name: newName,
            }
            dispatch(setAppStatusAC(STATUS.LOADING))
            await packsAPI.updatePack({cardsPack})
            await dispatch(getPacksTC())
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }