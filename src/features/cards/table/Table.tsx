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
        lastUpdated: string
        createdBy: string
        actions: string
    }
    onSetSortingClick: (headerName: string) => void
}

export const Table = memo(({rows, headers, onSetSortingClick}: TablePropsType) => {
        console.log('table')
        const userId = useSelector<RootReducerType, string>(state => state.profile._id)
        const CELL_FOR_BUTTONS = 4
        const titles = Object.values(headers)

        return (
            <table className={s.table}>
                <thead>
                <tr>
                    {titles.map((title, i) => {
                            if (title === 'Last Updated' || title === 'Created By') {
                                const onTitleClick = () => {
                                    onSetSortingClick(title)
                                }
                                return (
                                    <th key={i} onClick={onTitleClick}>
                                        {title}</th>)
                            }

                            return (
                                <th key={i}>{title}</th>
                            )
                        }
                    )}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => <tr key={i}>
                    {Object.values(row).map((value, i) => i !== CELL_FOR_BUTTONS &&
                        <td key={i}>{value}</td>)}
                    <td className={s.btns}>{row.user_id === userId &&
                    <><SuperButton>Delete</SuperButton><SuperButton>Edit</SuperButton></>
                    }
                        <SuperButton>Learn</SuperButton></td>
                </tr>)
                }
                </tbody>
            </table>
        )
    }
)


