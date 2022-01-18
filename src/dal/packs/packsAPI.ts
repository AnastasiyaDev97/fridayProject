import {instance} from "../apiConfig";
import {Nullable} from "../../types/Nullable";
import {addNewPackPayloadType, getPacksQueryParamsType, getPacksResponseType, updatePackPayloadType} from "./types";

export const packsAPI = {
    getPacks(getPacksQueryParams: Nullable<getPacksQueryParamsType>) {
        return instance.get<getPacksResponseType>(`cards/pack`, {params: getPacksQueryParams})
            .then(res => res.data)
    },
    addPack(cardsPack: addNewPackPayloadType) {
        return instance.post(`cards/pack`, cardsPack)
            .then(res => res.data)
    },
    deletePack(packId: string) {
       return instance.delete(`cards/pack/?id=${packId}`)
            .then(res => res.data)
    },
    updatePack(cardsPack: updatePackPayloadType) {
        return instance.put(`cards/pack`, cardsPack)
            .then(res => res.data)
    },
}