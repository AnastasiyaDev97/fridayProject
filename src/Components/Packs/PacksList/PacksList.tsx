import s from './PacksList.module.scss'
import React, {memo, useCallback, useMemo, useState} from 'react';
import {UniversalTable} from "../../../features/cards/table/UniversalTable";
import Paginator from "../../../features/cards/pagination/Pagination";
import {useDispatch} from "react-redux";
import {changePageAC, changeSearchPackNameAC, setSortingFilter} from "../../../store/reducers/packs-reducer";
import {convertDateFormat} from "../../../utils/handles";
import SuperInputText from "../../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {UseSetTimeoutEffect} from "../../../common/hooks/customUseEffect";
import {PackType} from "../../../dal/packs/types";

import {ModalContainer} from "../../../common/components/Modal/ModalContainer/ModalContainer";

/*import {faSearch} from '@fortawesome/free-solid-svg-icons';*/

type PackListPropsType = {
    packs: Array<PackType>
    currentPage: number
    totalItemCount: number
    pageCount: number
    sortPacks: string
}

export type modalTypeT='addPack'|'deletePack'|'addCard'|'deleteCard'|''|'updatePack'


export const PacksList = memo(({packs, currentPage, totalItemCount, pageCount, sortPacks}: PackListPropsType) => {

    const [text, setText] = useState<string>('')
    const [modalType,setModalType]=useState<modalTypeT>('')
    const [propsForModal,setPropsForModal]=useState<any>(null)

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
                                  name, updated, user_id, _id, ...rest
                              }) => {
                    updated = convertDateFormat(updated)

                    return {name, cardsCount, updated, user_name, user_id, _id}
                }
            )
        }
        , [packs])

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


    const handleCloseModalButtonClick=()=>{
        setModalType('')
    }

    const handleAddPackButtonClick=()=>{
        setModalType('addPack')
    }
    const handleDeleteButtonClick=(packId:string)=>{
        setModalType('deletePack')
        setPropsForModal(packId)
    }
    const handleUpdatePackClick=(packId: string)=>{
        setModalType('updatePack')
        setPropsForModal(packId)
    }

    return (
        <div className={s.listWrapper} aria-disabled={true}>

            <h2>Packs List</h2>

            <div className={s.row}>
                {/*<FontAwesomeIcon icon={faSearch}/>*/}
                <SuperInputText style={{width: '60%'}} value={text}
                                onChangeText={setText} onEnter={handleSearchPack}/>
                <SuperButton style={{width: '35%'}} onClick={handleAddPackButtonClick}>Add new pack</SuperButton>
            </div>
            {modalType && <ModalContainer onCloseModalButtonClick={handleCloseModalButtonClick} type={modalType}
                                          propsForModal={propsForModal}/>}
            <UniversalTable rows={packsForTable} headers={headersForPacks}
                            onSetSortingClick={handleSetSortingClick}
                            component={'packs'} onDeleteButtonClick={handleDeleteButtonClick}
                            onUpdatePackClick={handleUpdatePackClick}/>
            <Paginator totalItemCount={totalItemCount} pageCount={pageCount} currentPage={currentPage}
                       onChangePageClick={handleChangePageClick} portionSize={portionSize}/>
        </div>
    )
})