import {instance} from "../apiConfig";
import {addNewCardPayloadType, getCardsQueryParamsType, getCardsResponseType, updateCardPayloadType} from "./types";

export const cardsAPI = {
    getCards(getCardsQueryParams: getCardsQueryParamsType) {
        return instance.get<getCardsResponseType>(`cards/card`, {params: getCardsQueryParams})
            .then(res => {
                return res.data
            })
    },

    addCard(card:addNewCardPayloadType){
        return instance.post(`cards/card`, card)
            .then(res => {
                return res.data
            })
    },
    deleteCard(id:string){
        return instance.delete(`cards/card/?id=${id}`)
            .then(res => {
                return res.data
            })
    },
    updateCard(card:updateCardPayloadType){
        return instance.put(`cards/card`,card)
            .then(res => {
                return res.data
            })
    },
}