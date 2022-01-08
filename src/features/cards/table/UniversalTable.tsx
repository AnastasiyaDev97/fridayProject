import React, {memo, MouseEvent} from 'react';
import s from './UniversalTable.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";

import {useNavigate} from "react-router-dom";


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
}

export const UniversalTable = memo(({
                                        rows, headers, onSetSortingClick, component,
                                        onDeleteButtonClick, onUpdatePackClick
                                    }: TablePropsType) => {
        console.log('table')
        const dispatch = useDispatch()
        const navigate = useNavigate()

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

                    const onLearnButtonClick = () => {

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

                    const onUpdateButtonClick = () => {
                        onUpdatePackClick!(row._id)
                    }

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
                                <SuperButton /*onClick={}*/>Learn</SuperButton></td>}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
)


