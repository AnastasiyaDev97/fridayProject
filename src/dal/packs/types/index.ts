import {Nullable} from "../../../types/Nullable";

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
    user_name: string
}

export type newPassDataType = {
    password: string
    resetPasswordToken: string
}
export type getPacksQueryParamsType = {
    packName?: Nullable<string>
    min?: number
    max?: number
    sortPacks?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: Nullable<string>
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