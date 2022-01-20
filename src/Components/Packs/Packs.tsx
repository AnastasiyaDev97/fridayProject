import React, {FC, memo, useEffect} from 'react';
import s from './Packs.module.scss'
import {PacksParams} from "./PacksParams/PacksParams";

import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {getPacks} from "../../selectors/getPacks";
import {getCurrentPage} from "../../selectors/getCurrentPage";
import {setAppStatusAC} from "../../store/reducers/app-reducer";
import {Nullable} from "../../types/Nullable";
import {PackType} from "../../dal/packs/types";
import {modalActionType} from "../../common/components/Modal/ModalContainer/ModalContainer";
import {withRedirect} from "../../common/hoc/withRedirect";
import {PacksList} from "./PacksList";
import {STATUS} from "../../enum/StatusType";
import {getPacksTC} from "../../store/thunks/packs";
type PacksT={
    setModalData:(modalAction:modalActionType,id: string)=>void
}

const Packs:FC<PacksT> = memo(({setModalData}) => {
    const dispatch = useDispatch()

    const packs = useSelector<RootReducerType, Array<PackType>>(getPacks)
    const currentPage = useSelector<RootReducerType, number>(getCurrentPage)
    const totalItemCount = useSelector<RootReducerType, number>((state) => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<RootReducerType, number>((state) => state.packs.pageCount)
    const minValueForRangeSlider = useSelector<RootReducerType, number>((state) => state.packs.min)
    const maxValueForRangeSlider = useSelector<RootReducerType, number>((state) => state.packs.max)
    const sortPacks = useSelector<RootReducerType, string>((state) => state.packs.sortPacks)
    const packName = useSelector<RootReducerType, Nullable<string>>((state) => state.packs.packName)
    const user_id = useSelector<RootReducerType, Nullable<string>>((state) => state.packs.user_id)

    useEffect(() => {
        dispatch(setAppStatusAC(STATUS.LOADING))
        let idOfTimeout = setTimeout(() => {
            dispatch(getPacksTC())
        }, 1000)

        return () => {
            clearTimeout(idOfTimeout)
        }
    }, [dispatch, currentPage, minValueForRangeSlider, maxValueForRangeSlider, user_id,
        sortPacks,packName])

    if (!packs) {
        return <></>
    }

    return (
        <div className={s.wrapper}>
            <PacksParams minValueForRangeSlider={minValueForRangeSlider} maxValueForRangeSlider={maxValueForRangeSlider}/>
            <PacksList packs={packs} currentPage={currentPage} totalItemCount={totalItemCount} pageCount={pageCount}
                       sortPacks={sortPacks} setModalData={setModalData}/>
        </div>
    )
})

export default withRedirect(Packs)