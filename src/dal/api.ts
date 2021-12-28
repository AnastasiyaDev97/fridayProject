import axios from "axios";
import {loginAuthDataType} from "../store/reducers/login-reducer";


const instance = axios.create({
    baseURL: /*'http://localhost:7542/2.0/'*/'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})
export const authorizationAPI = {
    registerMe(email: string, password: string) {
        return instance.post<RegisterErrorResponse>(`auth/register`, {email, password})
            .then(res => {
                console.log(res.data)
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
        return axios.post<ResponseForgotPasswordType>(`https://neko-back.herokuapp.com/2.0/auth/forgot`, messageDataPassword,
            {withCredentials: true})
            .then(res => {
                return res.data
            })
    },
    setNewPassword(newPassData: newPassDataType) {
        return axios.post<LogoutResponse>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, newPassData,
            {withCredentials: true})
            .then(res => {
                return res.data
            })
    }
}

export const cardsAPI = {
    getPacks() {
        return instance.get<getPacksResponseType>(`cards/pack`)
            .then(res => {
                return res.data
            })
    },
}
/*
<!--https://nastyaZ23.github.io/fridayProject-->*/

// types


export type ResponseLoginType = {
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Date
    verified: boolean
    __v: number
    _id: string
    error?: string
}
type RegisterErrorResponse = {
    error?: string
}
type LogoutResponse = {
    info?: string
    error?: string
}

type ResponseForgotPasswordType = {
    answer?: boolean
    html?: boolean
    info?: string
    success?: boolean
    error?: string
}
type getPacksResponseType={
    cardPacks:Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number

}
export type PackType={
    cardsCount: number
    created: Date
    name: string
    updated: Date
    user_id: string
    _id: string
}

export type newPassDataType = {
    password: string
    resetPasswordToken: string
}