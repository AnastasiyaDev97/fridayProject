import {FC, memo, useCallback, useState} from "react";
import {Modal} from "../Modal";
import SuperInputText from "../../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {addPackTC, deletePackTC, updatePackTC} from "../../../../store/reducers/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import s from './ModalContainer.module.scss'
import {setModalPropsAC, setModalTypeAC} from "../../../../store/reducers/modal-reducer";
import {RootReducerType} from "../../../../store/store";
import {addCardTC, deleteCardTC, updateCardTC} from "../../../../store/reducers/cards-reducer";
import {useParams} from "react-router-dom";
import {updateCardType} from "../../../../dal/cards/types";

export type modalActionType = 'delete' | 'add' | 'update' | 'learn' | ''
export type modalEntityType = 'card' | 'pack' | ''
type ModalContainerPropsType = {}

export const ModalContainer: FC<ModalContainerPropsType> = memo((
    {}
) => {

    const dispatch = useDispatch()

    const params = useParams<'id'>()
    const cardsPack_id=params.id

    const [name, setName] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


    const propsForModal = useSelector<RootReducerType, any>(state => state.modals.propsForModal)
    const modalAction = useSelector<RootReducerType, modalActionType>(state => state.modals.modalAction)
    const modalEntity = useSelector<RootReducerType, modalEntityType>(state => state.modals.modalEntity)

    /*const modalType = useSelector<RootReducerType, modalTypeT>(state => state.modals.modalType)*/
    /*   const answerForLearnModal= useSelector<RootReducerType, string>
       (state=>state.cards.cards.filter(f=>f.cardsPack_id===propsForModal))*/

    const onSavePackButtonClick = () => {
        dispatch(addPackTC(name))
        onCloseModalButtonClick()
    }
    const onSaveCardButtonClick = () => {
        dispatch(addCardTC(propsForModal, question, answer))
        onCloseModalButtonClick()
    }
    const onDeletePackButtonClick = () => {
        dispatch(deletePackTC(propsForModal))
        onCloseModalButtonClick()
    }
    const onDeleteCardButtonClick = () => {
        if (cardsPack_id){
        dispatch(deleteCardTC(cardsPack_id, propsForModal))}
        onCloseModalButtonClick()
    }

    const onUpdatePackClick = () => {
        dispatch(updatePackTC(propsForModal, name))
        onCloseModalButtonClick()
    }
    const onUpdateCardClick = () => {

        if (cardsPack_id){
        dispatch(updateCardTC(cardsPack_id,{_id:propsForModal,question, answer}))
        }
        onCloseModalButtonClick()
    }

    const onCloseModalButtonClick = useCallback(() => {
        dispatch(setModalTypeAC('', ''))
        dispatch(setModalPropsAC(null))
    }, [])

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
        /* 'learnPack':{title:}*/
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

    /* if (modalType === 'learnPack') {
         modalBody = modals.learnPack
     }*/
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