import React, {useCallback, useEffect, useMemo} from 'react';
import s from './Cards.module.scss'
import Pagination from "../../features/cards/pagination/Pagination";
import {convertDateFormat} from "../../utils/handles";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {changePageCardsAC, getCardsTC, setSortingFilterCards} from "../../store/reducers/cards-reducer";
import {UniversalTable} from "../../features/cards/table/UniversalTable";
import {useNavigate, useParams} from "react-router-dom";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {CardType} from "../../dal/cards/types";
import {setAppStatusAC} from "../../store/reducers/app-reducer";


export const Cards = () => {

    const dispatch = useDispatch()
    const params = useParams<'id'>()
    const navigate = useNavigate()


    const cards = useSelector<RootReducerType, Array<CardType>>(state => state.cards.cards)
    const sortCards = useSelector<RootReducerType, string>((state) => state.cards.sortCards)
    const totalItemCount = useSelector<RootReducerType, number>((state) => state.cards.cardsTotalCount)
    const pageCount = useSelector<RootReducerType, number>((state) => state.cards.pageCount)
    const currentPage = useSelector<RootReducerType, number>((state) => state.cards.page)


    const PORTION_SIZE = 10
    const headersForCards = {
        question: 'Question', answer: 'Answer',
        updated: 'Last updated', grade: 'Grade'
    }
    const cardsForTable = useMemo(() => {
            return cards.map(({
                                  question, answer,
                                  updated, grade, _id
                              }) => {
                    updated = convertDateFormat(updated)
                    return {question, answer, updated, grade, _id}
                }
            )
        }
        , [cards])


    useEffect(() => {
        dispatch(setAppStatusAC('loading', true))
        let idOfTimeout = setTimeout(() => {
            if (params.id) {
                dispatch(getCardsTC({cardsPack_id: params.id, page: currentPage, sortCards}))
            }
        }, 1000)
        return () => {
            clearTimeout(idOfTimeout)
        }
    }, [dispatch, currentPage, sortCards])


    const handleSetSortingClick = useCallback((headerName: string) => {
        dispatch(setSortingFilterCards(sortCards[0] === '0' ? `1${headerName}` : `0${headerName}`))
    }, [dispatch, sortCards])

    const handleChangePageClick = useCallback((page: number) => {
            dispatch(changePageCardsAC(page))
        },
        [dispatch])

    const onTitleClick = () => {
        navigate(-1)
    }

    const handleAddCardButtonClick = useCallback(() => {
        if (params.id) {

        }
    }, [dispatch, params.id])


    if (!cards) {
        return <></>
    }
    return (
        <div className={s.wrapper}>
            <h2 onClick={onTitleClick} className={s.cursor}>&#8592; Pack Name</h2>
            <SuperButton style={{width: '35%'}} /*onClick={}*/>Add new card</SuperButton>


            <UniversalTable rows={cardsForTable} headers={headersForCards}
                            onSetSortingClick={handleSetSortingClick} component={'cards'}/>
            <Pagination totalItemCount={totalItemCount}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onChangePageClick={handleChangePageClick}
                        portionSize={PORTION_SIZE}/>
        </div>
    )
}