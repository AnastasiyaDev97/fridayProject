import {AppDispatch} from "../store";
import {setAppStatusAC} from "../reducers/app-reducer";
import {STATUS} from "../../enum/StatusType";
import {authorizationAPI} from "../../dal/authorization/authorization";
import {setProfileAC} from "../reducers/profile-reducer";
import {catchErrorHandler} from "../../utils/error-utils";
import {isAuthToggleAC, loginAuthDataType} from "../reducers/login-reducer";

export const loginTC = (loginAuthData: loginAuthDataType) =>
    async (dispatch: AppDispatch) => {
        try {

            dispatch(setAppStatusAC(STATUS.LOADING))
            let res = await authorizationAPI.loginMe(loginAuthData)

            dispatch(setAppStatusAC(STATUS.SUCCEEDED))
            dispatch(isAuthToggleAC(true))
            dispatch(setProfileAC(res))
        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }

export const logoutTC = () =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setAppStatusAC(STATUS.LOADING))
            await authorizationAPI.logoutMe()
            dispatch(setAppStatusAC(STATUS.SUCCEEDED))
            dispatch(isAuthToggleAC(false))

        } catch (err) {
            catchErrorHandler(dispatch, err)
        }
    }