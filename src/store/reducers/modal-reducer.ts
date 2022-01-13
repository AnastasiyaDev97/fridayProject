import {ActionsType} from "./AC types/types";
import {modalActionType, modalEntityType} from "../../common/components/Modal/ModalContainer/ModalContainer";



/*export type modalTypeT='addCard'|''|'addPack'|'deleteCard'|'deletePack'|'updatePack'|'updateCard'|'learnPack'*/

let initialState = {
    modalAction: '' as modalActionType,
    modalEntity: '' as modalEntityType,
    id: ''
}

type InitialStateType = {
    modalAction: modalActionType
    modalEntity: modalEntityType
    id:string
}


export const modalReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'MODAL/SET-MODAL-TYPE':
            return {...state, ...action.payload}
        case 'MODAL/SET-MODAL-PROPS':
debugger
            return {...state, ...action.payload}

        default:
            return state
    }
}
export const setModalTypeAC = (modalAction: modalActionType, modalEntity: modalEntityType) => ({
    type: 'MODAL/SET-MODAL-TYPE',
    payload: {
        modalAction,
        modalEntity
    }
} as const)

export const setModalPropsAC = (id:string) => {
    return{
    type: 'MODAL/SET-MODAL-PROPS',
    payload: {id}
} as const}