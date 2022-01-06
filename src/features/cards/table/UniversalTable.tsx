import React, {memo, useCallback} from 'react';
import s from './UniversalTable.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {deletePackTC, updatePackTC} from '../../../store/reducers/packs-reducer';




type TablePropsType = {
    component:'packs'|'cards'
    rows: Array<{
        name?: string
        cardsCount?: number
        updated: string
        created?: string
        user_id?: string
        _id: string
        question?:string
        answer?:string
        grade?:number
    }>

    headers: {
        name?: string
        cardsCount?: string
        updated: string
        created?: string
        actions?: string
        question?:string
        answer?:string
        grade?:string
    }
    onSetSortingClick: (headerName: string) => void
    onTableRowClick?: (id: string) => void
}

export const UniversalTable = memo(({rows, headers, onSetSortingClick,onTableRowClick,component}: TablePropsType) => {
        console.log('table')
        const dispatch = useDispatch()

        const userId = useSelector<RootReducerType, string>(state => state.profile._id)
        const CELL_FOR_BUTTONS = 4
        const titles = Object.entries(headers)

        const handleDeletePackClick = (packId: string) => {
            debugger
            dispatch(deletePackTC(packId))
        }

        const handleUpdatePackNameDoubleClick = useCallback((packId: string, newName: string) => {
            dispatch(updatePackTC(packId, newName))
        }, [dispatch])

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

                    const onDeleteButtonClick = () => {
                        debugger
                        handleDeletePackClick(row._id)
                    }

                    const onOpenCardsClick = () => {
                        if(onTableRowClick){
                        onTableRowClick(row._id)}
                    }

                    return (
                        <tr key={i} >
                            {Object.values(row).map((value, i) => i < CELL_FOR_BUTTONS &&
                                <td key={i}>{value}</td>)}
                            {component==='packs'&&<td className={s.btns}>
                                <SuperButton disabled={CONDITION_FOR_DISABLE_BUTTON}
                                             onClick={onDeleteButtonClick}>Delete</SuperButton><SuperButton
                                disabled={CONDITION_FOR_DISABLE_BUTTON}>Edit</SuperButton>
                                <SuperButton onClick={onOpenCardsClick}>Learn</SuperButton></td>}
                        </tr>)
                })}
                </tbody>
            </table>
        )
    }
)


