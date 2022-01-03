import s from './PacksList.module.scss'
import React, {useCallback} from 'react';
import {Table} from "../../../features/cards/table/Table";
import SuperInputText from "../../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import Paginator from "../../../features/cards/pagination/Pagination";
import {useDispatch} from "react-redux";
import {changePageAC, setSortingFilter, sortingFilterType} from "../../../store/reducers/packs-reducer";
import {PackType} from "../../../dal/apiTypes";
import {convertDateFormat} from "../../../utils/handles";

type PackListPropsType = {
    packs: Array<PackType>
    currentPage: number
    totalItemCount: number
    pageSize: number
    sortPacks: sortingFilterType
}

export const PacksList = ({packs, currentPage, totalItemCount, pageSize, sortPacks}: PackListPropsType) => {
    console.log('packlist')
    const dispatch = useDispatch()

    const PORTION_SIZE = 10
    const CREATED_BY = 'Created By'
    const LAST_UPDATED = 'Last Updated'

    const CREATED_FROM_EARLIER = '0created'
    const CREATED_FROM_LATER = '1created'
    const UPDATED_FROM_LATER = '1updated'
    const UPDATED_FROM_EARLIER = '0updated'


    const headersForPacks = {
        cardsName: 'Name', cardsCount: 'Cards',
        lastUpdated: LAST_UPDATED, createdBy: CREATED_BY, actions: 'Actions'
    }
    const packsForTable = packs.map(({
                                         cardsCount, created,
                                         name, updated, user_id, ...rest
                                     }) => {
            updated = convertDateFormat(updated)
            created = convertDateFormat(created)
            return {name, cardsCount, updated, created, user_id}
        }
    )

    const handleChangePageClick = (page: number) => {
        dispatch(changePageAC(page))
    }


    const handleSetSortingClick = useCallback((headerName: string) => {
        if (headerName === CREATED_BY) {
            dispatch(setSortingFilter(CREATED_FROM_LATER === sortPacks ? CREATED_FROM_EARLIER
                : CREATED_FROM_LATER))
        }
        dispatch(setSortingFilter(UPDATED_FROM_LATER === sortPacks ? UPDATED_FROM_EARLIER
            : UPDATED_FROM_LATER))
    }, [dispatch,sortPacks])


    return (
        <div className={s.listWrapper}>
            <h2>Packs List</h2>
            <div className={s.row}>
                <SuperInputText style={{width: '60%'}}/>
                <SuperButton style={{width: '35%'}}>Add new pack</SuperButton>
            </div>
            <Table rows={packsForTable} headers={headersForPacks}
                   onSetSortingClick={handleSetSortingClick}/>
            <Paginator totalItemCount={totalItemCount} pageSize={pageSize} currentPage={currentPage}
                       onChangePageClick={handleChangePageClick} portionSize={PORTION_SIZE}/>
        </div>
    )
}