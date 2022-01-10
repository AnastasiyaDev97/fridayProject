import {ActionsType} from "./AC types/types";
import {modalActionType, modalEntityType} from "../../common/components/Modal/ModalContainer/ModalContainer";


/*export type modalTypeT='addCard'|''|'addPack'|'deleteCard'|'deletePack'|'updatePack'|'updateCard'|'learnPack'*/

let initialState = {
    modalAction: '' as modalActionType,
    modalEntity: '' as modalEntityType,
    propsForModal: null
}

type InitialStateType = {
    modalAction: modalActionType
    modalEntity: modalEntityType
    propsForModal: any
}


export const modalReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'MODAL/SET-MODAL-TYPE':
        case 'MODAL/SET-MODAL-PROPS':
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

export const setModalPropsAC = (propsForModal: any) => ({
    type: 'MODAL/SET-MODAL-PROPS',
    payload: {propsForModal}
} as const)