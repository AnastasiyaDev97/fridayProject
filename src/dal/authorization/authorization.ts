import {instance} from "../apiConfig";
import {loginAuthDataType} from "../../store/reducers/login-reducer";
import axios from "axios";
import {LogoutResponse, RegisterErrorResponse, ResponseForgotPasswordType, ResponseLoginType} from "./types";
import {newPassDataType} from "../packs/types";



export const authorizationAPI = {
    registerMe(email: string, password: string) {
        return instance.post<RegisterErrorResponse>(`auth/register`, {email, password})
            .then(res => {
                return res.data
            })
    },
    loginMe(loginAuthData: loginAuthDataType) {
        return instance.post<ResponseLoginType>(`auth/login`, loginAuthData)
            .then(res => {
                return res.data
            })

    },
    logoutMe() {
        return instance.delete<LogoutResponse>(`auth/me`)
            .then(res => {
                return res.data
            })
    },
    authMe() {
        return instance.post<ResponseLoginType>(`auth/me`)
            .then(res => {
                return res.data
            })
    },
    sendPassword(email: string) {
        const messageDataPassword = {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='https://nastyaz23.github.io/fridayProject/#new-password/$token$'>
link</a></div>`
        }
        return axios.post<ResponseForgotPasswordType>(`https://neko-back.herokuapp.com/2.0/auth/forgot`
            , messageDataPassword,
            {withCredentials: true})
            .then(res => {
                return res.data
            })
    },
    setNewPassword(newPassData: newPassDataType) {
            return axios.post<LogoutResponse>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`
            , newPassData,
            {withCredentials: true})
            .then(res => {
                return res.data
            })
    }
}

/*
<!--https://nastyaZ23.github.io/fridayProject-->*!/*/
