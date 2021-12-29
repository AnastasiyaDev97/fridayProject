import React, {useEffect} from 'react';
import s from './Packs.module.scss'
import {PacksParams} from "./PacksParams/PacksParams";
import {PacksList} from "./PacksList/PacksList";
import {useDispatch, useSelector} from "react-redux";

import {RootReducerType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {getPacksTC, setMaxValue, setMinValue, toggleShowCardsModeAC} from "../../store/reducers/packs-reducer";
import {PackType} from "../../dal/api";


export const Packs = () => {
    const dispatch = useDispatch()
    const packs = useSelector<RootReducerType, Array<PackType>>(state => state.packs.cardPacks)
    const currentPage = useSelector<RootReducerType, number>(state => state.packs.page)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const totalItemCount = useSelector<RootReducerType, number>((state) => state.packs.cardPacksTotalCount)
    const pageSize = useSelector<RootReducerType, number>((state) => state.packs.pageCount)
    const maxCardsCount = useSelector<RootReducerType, number>((state) => state.packs.maxCardsCount)
    const minCardsCount = useSelector<RootReducerType, number>((state) => state.packs.minCardsCount)

    const onChangeMaxHandler = (maxValue: number) => {
        dispatch(setMaxValue(maxValue))
    }
    const onChangeMinHandler = (minValue: number) => {
        dispatch(setMinValue(minValue))
    }
    const toggleShowCardsMode = (mode: boolean) => {
        dispatch(toggleShowCardsModeAC(mode))
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch,currentPage, maxCardsCount, minCardsCount])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    if (!packs) {
        return <></>
    }
    return (
        <div className={s.wrapper}>
            <PacksParams maxCardsCount={maxCardsCount} minCardsCount={minCardsCount}
                         onChangeMaxHandler={onChangeMaxHandler}
                         onChangeMinHandler={onChangeMinHandler} toggleShowCardsMode={toggleShowCardsMode}/>
            <PacksList packs={packs} currentPage={currentPage} totalItemCount={totalItemCount} pageSize={pageSize}/>
        </div>
    )
}