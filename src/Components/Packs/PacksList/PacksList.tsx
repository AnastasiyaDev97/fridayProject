import s from './PacksList.module.scss'
import React, {memo, useCallback, useMemo} from 'react';
import {UniversalTable} from "../../../features/cards/table/UniversalTable";
import Paginator from "../../../features/cards/pagination/Pagination";
import {useDispatch} from "react-redux";
import {addPackTC, changePageAC, setSortingFilter} from "../../../store/reducers/packs-reducer";
import {PackType} from "../../../dal/apiTypes";
import {convertDateFormat} from "../../../utils/handles";
import {useNavigate} from "react-router-dom";
import {AddItem} from "../../../common/components/AddItem/AddItem";


type PackListPropsType = {
    packs: Array<PackType>
    currentPage: number
    totalItemCount: number
    pageCount: number
    sortPacks: string
}


export const PacksList = memo(({packs, currentPage, totalItemCount, pageCount, sortPacks}: PackListPropsType) => {

    console.log('packlist')
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const PORTION_SIZE = 10

    const headersForPacks = {
        name: 'Name', cardsCount: 'Cards',
        updated: 'Last updated', created: 'Created by', actions: 'Actions'
    }
    const packsForTable = useMemo(() => {
            return packs.map(({
                                  cardsCount, created,
                                  name, updated, user_id,_id, ...rest
                              }) => {
                    updated = convertDateFormat(updated)
                    created = convertDateFormat(created)
                    return {name, cardsCount, updated, created, user_id,_id}
                }
            )
        }
        , [packs])


    const handleChangePageClick = useCallback((page: number) => {
            dispatch(changePageAC(page))
        },
        [dispatch])


    const handleSetSortingClick = useCallback((headerName: string) => {
           dispatch(setSortingFilter(sortPacks[0]==='0'?`1${headerName}`:`0${headerName}` ))
    }, [dispatch,sortPacks])

    const handleAddPackButtonClick=useCallback((text:string)=>{
        dispatch(addPackTC(text))
    },[dispatch])

    const handleOpenCardClick=(id:string)=>{
        navigate(`/cards/${id}`)
    }


    return (
        <div className={s.listWrapper}>
            <h2>Packs List</h2>

                <AddItem title='Add new pack' onAddItemButtonClick={handleAddPackButtonClick}/>
            <UniversalTable rows={packsForTable} headers={headersForPacks}
                            onSetSortingClick={handleSetSortingClick} onTableRowClick={handleOpenCardClick}
                            component={'packs'}/>
            <Paginator totalItemCount={totalItemCount} pageCount={pageCount} currentPage={currentPage}
                       onChangePageClick={handleChangePageClick} portionSize={PORTION_SIZE}/>
        </div>
    )
})