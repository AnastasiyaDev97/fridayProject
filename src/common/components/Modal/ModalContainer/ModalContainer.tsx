import {FC, memo, useCallback, useEffect, useState} from "react";
import {Modal} from "../Modal";
import SuperInputText from "../../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import {addPackTC, deletePackTC, updatePackTC} from "../../../../store/reducers/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import s from './ModalContainer.module.scss'
import {setModalTypeAC} from "../../../../store/reducers/modal-reducer";
import {RootReducerType} from "../../../../store/store";
import {addCardTC, deleteCardTC, updateCardTC} from "../../../../store/reducers/cards-reducer";
import {useParams} from "react-router-dom";
import {CardType} from "../../../../dal/cards/types";

import {PackType} from "../../../../dal/packs/types";
import {LearnPackModal} from "../LearnPackModal/LearnPackModal";
import {getCard} from "../../../../utils/handles";

export type modalActionType = 'delete' | 'add' | 'update' | 'learn' | ''
export type modalEntityType = 'card' | 'pack' | ''
type ModalContainerPropsType = {
    pack?: PackType
}

export const ModalContainer: FC<ModalContainerPropsType> = memo(({pack}) => {

    const dispatch = useDispatch()

    const params = useParams<'id'>()
    const cardsPack_id = params.id
    const id = useSelector<RootReducerType, string>(state => state.modals.id)
    const cards = useSelector<RootReducerType, Array<CardType>>(state => state.cards.cards)
    const modalAction = useSelector<RootReducerType, modalActionType>(state => state.modals.modalAction)
    const card = cards.find(card => card._id === id)

    console.log(cards)

    const questionInitialValue = card ? card.question : ''
    const answerInitialValue = card ? card.answer : ''
    const nameInitialValue = pack ? pack.name : ''


    const [name, setName] = useState<string>(nameInitialValue)
    const [question, setQuestion] = useState<string>(questionInitialValue)
    const [answer, setAnswer] = useState<string>(answerInitialValue)
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0)
    const [isActivePrevBtn, setIsActivePrevBtn] = useState<boolean>(true)
    const [isActiveModalBtn, setIsActiveModalBtn] = useState<boolean>(true)
    const [prevCards, setIsPrevCards] = useState<CardType[]>([])

    const [activeCard, setActiveCard] = useState(cards[0])

    let questionForLearn =activeCard.question
    let answerForLearn =activeCard.answer
    let activeCardId =activeCard._id

    const limitLength = prevCards.length-1
    const conditionForExecution=(prevCards.length > 0) && (activeCardIndex < limitLength)

    const modalEntity = useSelector<RootReducerType, modalEntityType>(state => state.modals.modalEntity)

    useEffect(() => {
        if (activeCardIndex === 0) {
            setIsActivePrevBtn(false)
        }
    }, [activeCardIndex])


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
        if (cardsPack_id) {
            dispatch(deleteCardTC(cardsPack_id, id))
        }
        onCloseModalButtonClick()
    }

    const onUpdatePackClick = () => {
        dispatch(updatePackTC(id, name))
        onCloseModalButtonClick()
    }
    const onUpdateCardClick = () => {

        if (cardsPack_id) {
            dispatch(updateCardTC(cardsPack_id, {_id: id, question, answer}))
        }
        onCloseModalButtonClick()
    }

    const onNextCardButtonClick = useCallback(() => {
        if (!isActivePrevBtn) {
            setIsActivePrevBtn(true)
        }
        let newCard = getCard(cards)
        setActiveCard(newCard)
        setIsPrevCards([newCard, ...prevCards])
    }, [cards, isActivePrevBtn,prevCards])

    const handlePrevCardButtonClick = useCallback(() => {


        if (conditionForExecution) {
            setActiveCard(prevCards[activeCardIndex])
            setActiveCardIndex(activeCardIndex + 1)
        }
        else{
            setIsActivePrevBtn(false)
        }
    }
, [activeCard, activeCardIndex, prevCards,conditionForExecution])


const onCloseModalButtonClick = useCallback(() => {
    dispatch(setModalTypeAC('', ''))
}, [dispatch])

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
        title: ` ${questionForLearn}`, btn: {
            title: 'Next', callback: onNextCardButtonClick
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
const conditionActivateInputName = (modalEntity === 'pack' && (modalAction === 'add' || modalAction === 'update'))

return (
    <Modal modalBody={modalBody} onCloseModalButtonClick={onCloseModalButtonClick}
           isActiveModalBtn={isActiveModalBtn} isActivePrevBtn={isActivePrevBtn}
           onPrevCardButtonClick={handlePrevCardButtonClick} modalAction={modalAction}>

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
        {modalAction === 'learn' && <LearnPackModal answer={answerForLearn} activeCardId={activeCardId}/>
        }
    </Modal>
)
})