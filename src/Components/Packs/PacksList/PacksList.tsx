import s from './PacksList.module.scss'
import React, {memo, useCallback, useMemo, useState} from 'react';
import {Table} from "../../../features/cards/table/Table";
import SuperInputText from "../../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import Paginator from "../../../features/cards/pagination/Pagination";
import {useDispatch} from "react-redux";
import {addPackTC, changePageAC, setSortingFilter} from "../../../store/reducers/packs-reducer";
import {PackType} from "../../../dal/apiTypes";
import {convertDateFormat} from "../../../utils/handles";
import {useNavigate} from "react-router-dom";

type PackListPropsType = {
    packs: Array<PackType>
    currentPage: number
    totalItemCount: number
    pageSize: number
    sortPacks: string
}



export const PacksList = memo(({packs, currentPage, totalItemCount, pageSize, sortPacks}: PackListPropsType) => {

    console.log('packlist')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [text, setText] = useState<string>('')

    const error = text ? '' : 'error'
    const PORTION_SIZE = 10



    const headersForPacks = {
        cardsName: 'Name', cardsCount: 'Cards',
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

    const onButtonClick=useCallback(()=>{
        dispatch(addPackTC(text))
    },[dispatch,text])

    const handleOpenCardClick=(id:string)=>{
        navigate(`/cards/${id}`)
    }


    return (
        <div className={s.listWrapper}>
            <h2>Packs List</h2>
            <div className={s.row}>
                <SuperInputText style={{width: '60%'}} value={text}
                                onChangeText={setText} /*onEnter={}*/
                                error={error}/>
                <SuperButton style={{width: '35%'}} onClick={onButtonClick}>Add new pack</SuperButton>
            </div>
            <Table rows={packsForTable} headers={headersForPacks}
                   onSetSortingClick={handleSetSortingClick} onOpenCardClick={handleOpenCardClick}/>
            <Paginator totalItemCount={totalItemCount} pageSize={pageSize} currentPage={currentPage}
                       onChangePageClick={handleChangePageClick} portionSize={PORTION_SIZE}/>
        </div>
    )
})