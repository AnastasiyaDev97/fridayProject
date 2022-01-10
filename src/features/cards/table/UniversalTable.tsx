import React, {memo, MouseEvent} from 'react';
import s from './UniversalTable.module.scss'
import { useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";

import {useNavigate, useParams} from "react-router-dom";


type TablePropsType = {
    component: 'packs' | 'cards'
    rows: Array<{
        name?: string
        cardsCount?: number
        updated: string
        created?: string
        user_id?: string
        _id: string
        question?: string
        answer?: string
        grade?: number
    }>

    headers: {
        name?: string
        cardsCount?: string
        updated: string
        created?: string
        actions?: string
        question?: string
        answer?: string
        grade?: string

    }
    onSetSortingClick: (headerName: string) => void
    onDeleteButtonClick?: (packId: string) => void
    onUpdatePackClick?: (packId: string) => void
    onLearnPackClick?: (packId: string) => void
}

export const UniversalTable = memo(({
                                        rows, headers, onSetSortingClick, component,
                                        onDeleteButtonClick, onUpdatePackClick, onLearnPackClick
                                    }: TablePropsType) => {
        console.log('table')
        const navigate = useNavigate()
    /*const params = useParams<'id'>()*/

        const userId = useSelector<RootReducerType, string>(state => state.profile._id)
        const CELL_FOR_BUTTONS = 4
        const titles = Object.entries(headers)


        return (
            <table className={s.table}>
                <thead>
                <tr>
                    {titles.map(([key, value], i) => {
                            const onTitleClick = () => {
                                onSetSortingClick(key)
                            }
                            return (
                                <th key={i} onClick={onTitleClick} className={s.tableHeader}>
                                    {value}</th>)
                        }
                    )}
                </tr>
                </thead>
                <tbody>

                {rows.map((row, i) => {

                    const CONDITION_FOR_DISABLE_BUTTON = (row.user_id !== userId)

                    const onLearnButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        onLearnPackClick!(row._id)
                    }

                    const onDeleteModalCallClick = (e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        onDeleteButtonClick!(row._id)
                    }


                    const onOpenCardClick = () => {
                        if ((row.cardsCount! > 0) || (row.user_id === userId)) {
                            navigate(`/cards/${row._id}`)
                        }
                    }

                    const onUpdateButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        onUpdatePackClick!(row._id)
                    }

                  /*  const onDeleteCardButtonClick = (_id:string) => {
                        if (params.id) {
                            setModalData('delete', {params.id,_id})
                        }
                    }*/

                    return (
                        <tr key={i} onClick={onOpenCardClick}>
                            {Object.values(row).map((value, i) => i < CELL_FOR_BUTTONS &&
                                <td key={i}>{value}</td>)}
                            {component === 'packs' && <td className={s.btns}>
                                <SuperButton disabled={CONDITION_FOR_DISABLE_BUTTON}
                                             onClick={onDeleteModalCallClick}>Delete</SuperButton>
                                <SuperButton
                                    disabled={CONDITION_FOR_DISABLE_BUTTON} onClick={onUpdateButtonClick}>
                                    Edit</SuperButton>
                                <SuperButton onClick={onLearnButtonClick}>Learn</SuperButton></td>}
                            {/*{component==='cards'&& <td><SuperButton
                                onClick={()=>handleDeleteButtonClick(_id)}>
                                delete</SuperButton></td>}*/}
                        </tr>
                    )
                })}


                </tbody>
            </table>
        )
    }
)


