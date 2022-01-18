import s from './PacksList.module.scss'
import React, {memo, useCallback, useMemo, useState} from 'react';
import {UniversalTable} from "../../../features/cards/table/UniversalTable";
import Paginator from "../../../features/cards/pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {changePageAC, changeSearchPackNameAC, setSortingFilter} from "../../../store/reducers/packs-reducer";
import {convertDateFormat} from "../../../utils/handles";
import SuperInputText from "../../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {UseSetTimeoutEffect} from "../../../common/hooks/customUseEffect";
import {PackType} from "../../../dal/packs/types";

import {
    modalActionType,
    ModalContainer,
    modalEntityType
} from "../../../common/components/Modal/ModalContainer/ModalContainer";
import {RootReducerType} from "../../../store/store";
import {getCardsTC} from "../../../store/reducers/cards-reducer";


type PackListPropsType = {
    packs: Array<PackType>
    currentPage: number
    totalItemCount: number
    pageCount: number
    sortPacks: string
    setModalData:(modalAction:modalActionType,id: string)=>void
}


export const PacksList = memo(({packs, currentPage, totalItemCount, pageCount, sortPacks,
                                   setModalData}: PackListPropsType) => {

    const [text, setText] = useState<string>('')

    const modalEntity = useSelector<RootReducerType, modalEntityType>(state => state.modals.modalEntity)
    const id = useSelector<RootReducerType,string>(state => state.modals.id)

    console.log('packlist')
    const dispatch = useDispatch()

    const portionSize = 10

    const headersForPacks = {
        name: 'Name', cardsCount: 'Cards',
        updated: 'Last updated', user_name: 'Created by', actions: 'Actions'
    }

    const packsForTable = useMemo(() => {
            return packs.map(({
                                  cardsCount, user_name,
                                  name, updated, user_id, _id
                              }) => {
                    updated = convertDateFormat(updated)

                    return {name, cardsCount, updated, user_name,user_id,_id}
                }
            )
        }
        , [packs])

    const packForModal=packs.find(pack=>pack._id===id)

    UseSetTimeoutEffect(handleSearchPack, text, 2000)

    const handleChangePageClick = useCallback((page: number) => {
            dispatch(changePageAC(page))
        },
        [dispatch])


    const handleSetSortingClick = useCallback((headerName: string) => {
        dispatch(setSortingFilter(sortPacks[0] === '0' ? `1${headerName}` : `0${headerName}`))
    }, [dispatch, sortPacks])


    function handleSearchPack() {
        dispatch(changeSearchPackNameAC(text))
    }


    const handleAddPackButtonClick = useCallback(() => {
        setModalData('add','')
    },[setModalData])

    const handleDeleteButtonClick = useCallback((packId: string) => {
        setModalData('delete', packId)
    },[setModalData])

    const handleUpdatePackClick = useCallback((packId: string) => {
        setModalData('update', packId)
    },[setModalData])

    async function handleLearnPackClick (packId: string)  {
        await dispatch(getCardsTC({cardsPack_id:packId,max:100,pageCount:100}))
        setModalData('learn', packId)
    }

    return (
        <div className={s.listWrapper} aria-disabled={true}>

            <h2>Packs List</h2>

            <div className={s.row}>
                <SuperInputText style={{width: '60%'}} value={text}
                                onChangeText={setText} onEnter={handleSearchPack}/>
                <SuperButton style={{width: '35%'}} onClick={handleAddPackButtonClick}>Add new pack</SuperButton>
            </div>
            {modalEntity && <ModalContainer pack={packForModal}/>}
            <UniversalTable rows={packsForTable} headers={headersForPacks}
                            onSetSortingClick={handleSetSortingClick}
                            component={'packs'} onDeleteButtonClick={handleDeleteButtonClick}
                            onUpdateButtonClick={handleUpdatePackClick} onLearnPackClick={handleLearnPackClick}/>
            <Paginator totalItemCount={totalItemCount} pageCount={pageCount} currentPage={currentPage}
                       onChangePageClick={handleChangePageClick} portionSize={portionSize}/>
        </div>
    )
})