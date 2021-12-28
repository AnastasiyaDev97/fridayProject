import {Dispatch} from "redux";
import {setAppStatusAC, setErrorText} from "../store/reducers/app-reducer";


export const catchErrorHandler = (dispatch: Dispatch, err: string) => {
debugger
    dispatch(setErrorText(err))
    dispatch(setAppStatusAC('failed'))
}