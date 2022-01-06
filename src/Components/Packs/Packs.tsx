import React, {useCallback, useEffect} from 'react';
import s from './Packs.module.scss'
import {PacksParams} from "./PacksParams/PacksParams";
import {PacksList} from "./PacksList/PacksList";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {getPacksTC,  toggleShowCardsModeAC} from "../../store/reducers/packs-reducer";
import {PackType} from "../../dal/apiTypes";
import {getPacks} from "../../selectors/getPacks";
import {getCurrentPage} from "../../selectors/getCurrentPage";
import {setAppStatusAC} from "../../store/reducers/app-reducer";



export const Packs = () => {

    const dispatch = useDispatch()

    const packs = useSelector<RootReducerType, Array<PackType>>(getPacks)
    const currentPage = useSelector<RootReducerType, number>(getCurrentPage)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const totalItemCount = useSelector<RootReducerType, number>((state) => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<RootReducerType, number>((state) => state.packs.pageCount)
    const isOnlyMyCardShouldShown = useSelector<RootReducerType, boolean>((state) => state.packs.isOnlyMyCardShouldShown)
    const minValueForRangeSlider = useSelector<RootReducerType, number>((state) => state.packs.min)
    const maxValueForRangeSlider = useSelector<RootReducerType, number>((state) => state.packs.max)
    const sortPacks = useSelector<RootReducerType, string>((state) => state.packs.sortPacks)



    useEffect(() => {
        dispatch(setAppStatusAC('loading', true))
        let idOfTimeout = setTimeout(() => {
            dispatch(getPacksTC())
        }, 1000)
        return () => {
            clearTimeout(idOfTimeout)
        }
    }, [dispatch, currentPage, minValueForRangeSlider, maxValueForRangeSlider, isOnlyMyCardShouldShown,sortPacks])


    const handleToggleShowCardsModeClick = useCallback((isOnlyMyCardShouldShown: boolean) => {

        dispatch(toggleShowCardsModeAC(isOnlyMyCardShouldShown))
    },[dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    if (!packs) {
        return <></>
    }

    return (
        <div className={s.wrapper}>
            <PacksParams minValueForRangeSlider={minValueForRangeSlider} maxValueForRangeSlider={maxValueForRangeSlider}
                         onToggleShowCardsModeClick={handleToggleShowCardsModeClick}/>
            <PacksList packs={packs} currentPage={currentPage} totalItemCount={totalItemCount} pageCount={pageCount}
                       sortPacks={sortPacks}/>
        </div>
    )
}