import {instance} from "../apiConfig";
import {Nullable} from "../../types/Nullable";
import {addNewPackPayloadType, getPacksQueryParamsType, getPacksResponseType, updatePackPayloadType} from "./types";

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
        debugger
        return instance.delete(`cards/pack/?id=${packId}`)
            .then(res => {
                debugger
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