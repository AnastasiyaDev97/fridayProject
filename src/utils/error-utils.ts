import { AxiosError } from "axios";
import {Dispatch} from "redux";
import {setAppStatusAC, setErrorText} from "../store/reducers/app-reducer";


export const catchErrorHandler = (dispatch: Dispatch, err: AxiosError) => {
    dispatch(setErrorText(err.message))
    dispatch(setAppStatusAC('failed'))
}