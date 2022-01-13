import {FC, memo, useCallback, useState} from "react";
import {Modal} from "../Modal";
import SuperInputText from "../../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {addPackTC, deletePackTC, updatePackTC} from "../../../../store/reducers/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import s from './ModalContainer.module.scss'
import {setModalTypeAC} from "../../../../store/reducers/modal-reducer";
import {RootReducerType} from "../../../../store/store";
import {addCardTC, deleteCardTC, updateCardTC} from "../../../../store/reducers/cards-reducer";
import {useParams} from "react-router-dom";
import {CardType} from "../../../../dal/cards/types";

import {PackType} from "../../../../dal/packs/types";

export type modalActionType = 'delete' | 'add' | 'update' | 'learn' | ''
export type modalEntityType = 'card' | 'pack' | ''
type ModalContainerPropsType = {
cards?:Array<CardType>
    pack?:PackType

}

export const ModalContainer:FC<ModalContainerPropsType> = memo(({pack,cards}) => {
debugger
    const dispatch = useDispatch()

    const params = useParams<'id'>()
    const cardsPack_id=params.id
    const id = useSelector<RootReducerType,string>(state => state.modals.id)


    const card=cards?.find(card=>card._id===id)
    const cardsForLearn=cards?.filter(card=>card.cardsPack_id===id)
    console.log(cardsForLearn)

    const questionInitialValue=card?card.question:''
    const answerInitialValue=card?card.answer:''
    const nameInitialValue=pack?pack.name:''



    const [name, setName] = useState(nameInitialValue)
    const [question, setQuestion] = useState<string>(questionInitialValue)
    const [answer, setAnswer] = useState<string>(answerInitialValue)
    const [activeCardIndex,setActiveCardIndex] = useState(0)



    const modalAction = useSelector<RootReducerType, modalActionType>(state => state.modals.modalAction)
    const modalEntity = useSelector<RootReducerType, modalEntityType>(state => state.modals.modalEntity)



    const onSavePackButtonClick = () => {
        dispatch(addPackTC(name))
        onCloseModalButtonClick()
    }
    const onSaveCardButtonClick = () => {
        dispatch(addCardTC(id, question, answer))
        onCloseModalButtonClick()
    }
    const onDeletePackButtonClick = () => {
        dispatch(deletePackTC(id))
        onCloseModalButtonClick()
    }
    const onDeleteCardButtonClick = () => {
        if (cardsPack_id){
        dispatch(deleteCardTC(cardsPack_id, id))}
        onCloseModalButtonClick()
    }

    const onUpdatePackClick = () => {
        dispatch(updatePackTC(id, name))
        onCloseModalButtonClick()
    }
    const onUpdateCardClick = () => {

        if (cardsPack_id){
        dispatch(updateCardTC(cardsPack_id,{_id:id,question, answer}))
        }
        onCloseModalButtonClick()
    }

    const onCloseModalButtonClick = useCallback(() => {
        dispatch(setModalTypeAC('', ''))
    }, [])

    const onNextButtonClick = () => {
       setActiveCardIndex(activeCardIndex+1)
    }


    const modals = {
        'add': {
            title: `Add new ${modalEntity}`, btn: {
                title: 'Save', callback:
                    modalEntity === 'card' ? onSaveCardButtonClick : onSavePackButtonClick
            }
        },
        'delete': {
            title: `Delete ${modalEntity}`, btn: {
                title: 'Delete', callback:
                    modalEntity === 'pack' ? onDeletePackButtonClick : onDeleteCardButtonClick
            }
        },

        'update': {
            title: `Update ${modalEntity}`, btn: {
                title: 'Update', callback:
                    modalEntity === 'pack' ? onUpdatePackClick : onUpdateCardClick
            }
        },
        'learn': {
            title: `/*${cardsForLearn?cardsForLearn[activeCardIndex].answer:''}*/`, btn: {
                title: 'Next', callback: onNextButtonClick
            }
        },

    }


    let modalBody;
    if (modalAction === 'add') {
        modalBody = modals.add
    }
    if (modalAction === 'delete') {
        modalBody = modals.delete
    }

    if (modalAction === 'update') {
        modalBody = modals.update
    }

     if (modalAction === 'learn') {
         modalBody = modals.learn
     }
    const conditionForUpdateAddCardModal = (modalEntity === 'card') && (modalAction !== 'delete')
    const conditionActivateInputName = (modalEntity === 'pack' && (modalAction === 'add'||modalAction === 'update'))
    return (
        <Modal modalBody={modalBody}>

            {modalAction === 'delete' &&
            <span className={s.span}>Do you really want to remove this `&{modalEntity}`?
                <br/>All cards will be excluded from this course</span>}

            {conditionActivateInputName &&
            <SuperInputText className={s.input} value={name} onChangeText={setName}/>}

            {conditionForUpdateAddCardModal &&
            <>
                <SuperInputText className={s.input} value={question} onChangeText={setQuestion}
                                placeholder={'Your question'}/>
                <SuperInputText className={s.input} value={answer} onChangeText={setAnswer}
                                placeholder={'Your answer'}/>
            </>}

            <SuperButton onClick={onCloseModalButtonClick}>Cancel</SuperButton>
        </Modal>
    )
})