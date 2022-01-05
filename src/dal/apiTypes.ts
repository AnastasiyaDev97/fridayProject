import {Nullable} from "../types/Nullable";

export type ResponseLoginType = {
    created: Nullable<Date>
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Nullable<Date>
    verified: boolean
    __v: number
    _id: string
    error?: string
}
export type RegisterErrorResponse = {
    error?: string
}
export type LogoutResponse = {
    info?: string
    error?: string
}

export type ResponseForgotPasswordType = {
    answer?: boolean
    html?: boolean
    info?: string
    success?: boolean
    error?: string
}
export type getPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number

}
export type PackType = {
    cardsCount: number
    created: string
    name: string
    updated: string
    user_id: string
    _id: string
}

export type newPassDataType = {
    password: string
    resetPasswordToken: string
}
export type getPacksQueryParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: string
}

export type addNewPackPayloadType = {
    cardsPack: {
        name: string
        deckCover?: string
        private?: boolean
    }
}
export type updatePackPayloadType = {
    cardsPack: {
        _id: string
        name?: string
    }
}

export type getCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type getCardsQueryParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}