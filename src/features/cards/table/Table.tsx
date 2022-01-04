import React, {memo} from 'react';
import s from './Table.module.scss'
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";


type TablePropsType = {
    rows: Array<{
        name: string
        cardsCount: number
        updated: string
        created: string
        user_id: string
    }>

    headers: {
        cardsName: string
        cardsCount: string
        updated: string
        created: string
        actions: string
    }
    onSetSortingClick: (headerName: string) => void
}

export const Table = memo(({rows, headers, onSetSortingClick}: TablePropsType) => {
        console.log('table')
        const userId = useSelector<RootReducerType, string>(state => state.profile._id)
        const CELL_FOR_BUTTONS = 4
        const titles = Object.entries(headers)


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
                {rows.map((row, i) =>{

                    const CONDITION_FOR_DISABLE_BUTTON = (row.user_id !== userId)

                    return(
                 <tr key={i}>
                    {Object.values(row).map((value, i) => i !== CELL_FOR_BUTTONS &&
                        <td key={i}>{value}</td>)}
                    <td className={s.btns}>
                        <SuperButton disabled={CONDITION_FOR_DISABLE_BUTTON}>Delete</SuperButton><SuperButton
                            disabled={CONDITION_FOR_DISABLE_BUTTON}>Edit</SuperButton>
                        <SuperButton>Learn</SuperButton></td>
                </tr>)
                })}
                </tbody>
            </table>
        )
    }
)


