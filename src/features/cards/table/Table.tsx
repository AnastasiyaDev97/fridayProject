import React, {memo, useCallback} from 'react';
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {deletePackTC, updatePackTC} from '../../../store/reducers/packs-reducer';


type TablePropsType = {
    rows: Array<{
        name: string
        cardsCount: number
        updated: string
        created: string
        user_id: string
        _id: string
    }>

    headers: {
        cardsName: string
        cardsCount: string
        updated: string
        created: string
        actions: string
    }
    onSetSortingClick: (headerName: string) => void
    onOpenCardClick: (id: string) => void
}

export const Table = memo(({rows, headers, onSetSortingClick,onOpenCardClick}: TablePropsType) => {
        console.log('table')
        const dispatch = useDispatch()

        const userId = useSelector<RootReducerType, string>(state => state.profile._id)
        const CELL_FOR_BUTTONS = 4
        const titles = Object.entries(headers)

        const handleDeletePackClick = useCallback((packId: string) => {
            dispatch(deletePackTC(packId))
        }, [dispatch])

        const handleUpdatePackNameDoubleClick = useCallback((packId: string, newName: string) => {
            dispatch(updatePackTC(packId, newName))
        }, [dispatch])

        return (
            <table className={s.table}>
                <thead>
                <tr>
                    {titles.map(([key, value], i) => {
                            const onTitleClick = () => {
                                if (key === 'updated' || key === 'created') {
                                    onSetSortingClick(key)
                                }
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

                    const onButtonClick = () => {
                        handleDeletePackClick(row._id)
                    }

                    const onRowClick = () => {
                        onOpenCardClick(row._id)
                    }

                    return (
                        <tr key={i} onClick={onRowClick}>
                            {Object.values(row).map((value, i) => i < CELL_FOR_BUTTONS &&
                                <td key={i}>{value}</td>)}
                            <td className={s.btns}>
                                <SuperButton disabled={CONDITION_FOR_DISABLE_BUTTON}
                                             onClick={onButtonClick}>Delete</SuperButton><SuperButton
                                disabled={CONDITION_FOR_DISABLE_BUTTON}>Edit</SuperButton>
                                <SuperButton>Learn</SuperButton></td>
                        </tr>)
                })}
                </tbody>
            </table>
        )
    }
)


