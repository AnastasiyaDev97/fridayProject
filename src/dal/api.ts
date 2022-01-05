import axios from "axios";
import {loginAuthDataType} from "../store/reducers/login-reducer";
import {instance} from "./apiConfig";
import {
    addNewPackPayloadType, getCardsQueryParamsType, getCardsResponseType,
    getPacksQueryParamsType,
    getPacksResponseType,
    LogoutResponse,
    newPassDataType, RegisterErrorResponse,
    ResponseForgotPasswordType, ResponseLoginType, updatePackPayloadType
} from "./apiTypes";
import {Nullable} from "../types/Nullable";



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

export const packsAPI = {
    getPacks(getPacksQueryParams: Nullable<getPacksQueryParamsType>) {
        return instance.get<getPacksResponseType>(`cards/pack`, {params: getPacksQueryParams})
            .then(res => {
                return res.data
            })
    },
    addPack(cardsPack:addNewPackPayloadType){
        return instance.post(`cards/pack`, cardsPack)
            .then(res => {
                return res.data
            })
    },
    deletePack(packId:string){
        return instance.delete(`cards/pack/?id=${packId}`)
            .then(res => {
                return res.data
            })
    },
    updatePack(cardsPack:updatePackPayloadType){
        return instance.put(`cards/pack`,cardsPack)
            .then(res => {
                return res.data
            })
    },
}

export const cardsAPI = {
    getCards(getCardsQueryParams: Nullable<getCardsQueryParamsType>) {
        return instance.get<getCardsResponseType>(`cards/card`, {params: getCardsQueryParams})
            .then(res => {
                return res.data
            })
    },
    /*addPack(cardsPack:addNewPackPayloadType){
        return instance.post(`cards/pack`, cardsPack)
            .then(res => {
                return res.data
            })
    },
    deletePack(packId:string){
        return instance.delete(`cards/pack/?id=${packId}`)
            .then(res => {
                return res.data
            })
    },
    updatePack(cardsPack:updatePackPayloadType){
        return instance.put(`cards/pack`,cardsPack)
            .then(res => {
                return res.data
            })
    },*/
}

/*
<!--https://nastyaZ23.github.io/fridayProject-->*/






