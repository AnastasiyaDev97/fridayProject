import axios from "axios";
import {loginAuthDataType} from "../store/reducers/login-reducer";

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

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})
export const authorizationAPI = {
    registerMe(email: string, password: string) {
        debugger
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
            .catch((e) => {
                return  e.response ? e.response.data.error : (e.message + ', more details in the console')

            })
    },
    authMe() {
        return instance.post<ResponseLoginType>(`auth/me`)
            .then(res => {
                return res.data
            })
          /*  .catch((e) => {
                const err = e.response ? e.response.data.error : (e.message + ', more details in the console')
                return err
            })*/
    }
}