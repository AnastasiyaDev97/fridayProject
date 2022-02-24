import {FC, memo, useCallback, useEffect, useMemo} from 'react';
import style from './Cards.module.scss'
import Pagination from "../../features/cards/pagination/Pagination";
import {convertDateFormat} from "../../utils/handles";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {changePageCardsAC, setSortingFilterCards} from "../../store/reducers/cards-reducer";
import {UniversalTable} from "../../features/cards/table/UniversalTable";
import {useNavigate, useParams} from "react-router-dom";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {CardType} from "../../dal/cards/types";
import {setAppStatusAC} from "../../store/reducers/app-reducer";
import {ModalContainer} from "../../common/components/Modal/ModalContainer/ModalContainer";
import {Rating} from "./Rating/Rating";
import {STATUS} from "../../enum/StatusType";
import {getCardsTC} from "../../store/thunks/cards";
import {COMPONENT_NAME} from "../../enum/ComponentName";
import { modalActionType, modalEntityType } from 'src/enum/Modals';


type CardsT = {
    setModalData: (modalAction: modalActionType, id: string) => void
}

export const Cards: FC<CardsT> = memo(({setModalData}) => {

        const dispatch = useDispatch()

        const params = useParams<'id'>()
        const cardsPack_id = params.id

        const navigate = useNavigate()

        const cards = useSelector<RootReducerType, Array<CardType>>(state => state.cards.cards)
        const sortCards = useSelector<RootReducerType, string>((state) => state.cards.sortCards)
        const totalItemCount = useSelector<RootReducerType, number>((state) => state.cards.cardsTotalCount)
        const pageCount = useSelector<RootReducerType, number>((state) => state.cards.pageCount)
        const currentPage = useSelector<RootReducerType, number>((state) => state.cards.page)
        const modalEntity = useSelector<RootReducerType, modalEntityType>(state => state.modals.modalEntity)

        const PORTION_SIZE = 10
        const {Add,Delete,Update}=modalActionType
        const headersForTable = {
            question: 'Question', answer: 'Answer',
            updated: 'Last updated', grade: 'Grade', actions: 'Actions'
        }
        const cardsForTable = useMemo(() => {
                return cards.map(({
                                      question, answer,
                                      updated, grade, _id, user_id
                                  }) => {
                        updated = convertDateFormat(updated)
                        let rating = <Rating grade={grade}/>
                        return {question, answer, updated, rating, _id, user_id}
                    }
                )
            }
            , [cards])

        useEffect(() => {
            dispatch(setAppStatusAC(STATUS.LOADING))

            let idOfTimeout = setTimeout(() => {
                if (cardsPack_id) {
                    dispatch(getCardsTC({cardsPack_id, page: currentPage, sortCards}))
                }
            }, 1000)

            return () => {
                clearTimeout(idOfTimeout)
            }
        }, [dispatch, currentPage, sortCards])


        const handleSetSortingClick = useCallback((headerName: string) => {
            dispatch(setSortingFilterCards(sortCards[0] === '0' ? `1${headerName}`  : `0${headerName}`))
        }, [dispatch, sortCards])

        const handleChangePageClick = useCallback((page: number) => {
                dispatch(changePageCardsAC(page))},
            [dispatch])

        const onTitleGoBackClick = () => {
            navigate(-1)
        }

        const handleAddCardButtonClick = useCallback(() => {
            if (cardsPack_id) {
                setModalData(Add, cardsPack_id)
            }
        }, [setModalData, cardsPack_id,Add])


        const handleDeleteButtonClick = useCallback((_id: string) => {
            setModalData(Delete, _id)
        }, [setModalData,Delete])

        const handleUpdateCardClick = useCallback((_id: string) => {
            setModalData(Update, _id)
        }, [setModalData,Update])

        if (!cards) {
            return <></>
        }
        return (
            <div className={style.wrapper}>
                <h2 onClick={onTitleGoBackClick} className={style.cursor}>&#8592; Pack Name</h2>
                <SuperButton onClick={handleAddCardButtonClick} className={style.btn}>Add new card</SuperButton>
                {modalEntity && <ModalContainer />}

                <UniversalTable rows={cardsForTable} headers={headersForTable}
                                onSetSortingClick={handleSetSortingClick} component={COMPONENT_NAME.CARDS}
                                onDeleteButtonClick={handleDeleteButtonClick}
                                onUpdateButtonClick={handleUpdateCardClick}/>
                <Pagination totalItemCount={totalItemCount}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            onChangePageClick={handleChangePageClick}
                            portionSize={PORTION_SIZE}/>
            </div>
        )
    }
)