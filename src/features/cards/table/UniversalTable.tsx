import React, {memo, MouseEvent, ReactNode} from 'react';
import s from './UniversalTable.module.scss'
import {useSelector} from "react-redux";
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
    onDeleteButtonClick?: (id: string) => void
    onUpdateButtonClick?: (id: string) => void
    onLearnPackClick?: (packId: string) => void
}

export const UniversalTable = memo(({
                                        rows, headers, onSetSortingClick, component,
                                        onDeleteButtonClick, onUpdateButtonClick, onLearnPackClick
                                    }: TablePropsType) => {
        console.log('table')
        const navigate = useNavigate()
        /*const params = useParams<'id'>()*/

        const userId = useSelector<RootReducerType, string>(state => state.profile._id)

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

                    const CONDITION_FOR_DISABLE_BUTTON = row.user_id !== userId

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

                    const onUpdateModalCallClick = (e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        onUpdateButtonClick!(row._id)
                    }


                    return (
                        <tr key={i} onClick={onOpenCardClick}>
                            {Object.entries(row).map(([key, value], i) => {
                                const conditionForHidingCell = (key !== "user_id") && (key !== "_id")
                                if (conditionForHidingCell) {
                                    return (
                                        <td key={i}>{value}</td>
                                    )
                                }
                            })}
                             <td className={s.btns}>
                                <SuperButton disabled={CONDITION_FOR_DISABLE_BUTTON}
                                             onClick={onDeleteModalCallClick}>Delete</SuperButton>
                                <SuperButton
                                    disabled={CONDITION_FOR_DISABLE_BUTTON} onClick={onUpdateModalCallClick}>
                                    Edit</SuperButton>
                                 {component === 'packs' &&
                                 <SuperButton onClick={onLearnButtonClick}>Learn</SuperButton>}</td>
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


