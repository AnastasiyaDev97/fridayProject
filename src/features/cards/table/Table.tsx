import React from 'react';
import s from './Table.module.scss'
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {PackType} from "../../../dal/api";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {convertDateFormat} from "../../../utils/handles";

type TablePropsType = {
    packs: Array<PackType>
}

export const Table = (props: TablePropsType) => {

    const userId = useSelector<RootReducerType, string>(state => state.profile.profile._id)
    const packsForTable = props.packs.map(({
                                               cardsCount, created,
                                               name, updated, user_id, ...rest
                                           }) => {
            updated = convertDateFormat(updated)
            created = convertDateFormat(created)
            return {name, cardsCount, updated, created, user_id}
        }
    )


    const theadArr = ['Name', 'Cards', 'Last Updated', 'Created By', 'Actions']

    return (
        <table className={s.table}>
            <thead>
            <tr>
                {theadArr.map(m => <th key={m}>{m}</th>)}
            </tr>
            </thead>
            <tbody>
            {packsForTable.map((m, i) => <tr key={i}>
                {Object.values(m).map((m, i) => i !== 4 && <td key={i}>{m}</td>)}
                <td className={s.btns}>{m.user_id === userId &&
                <><SuperButton>Delete</SuperButton><SuperButton>Edit</SuperButton></>
                } <SuperButton>Learn</SuperButton></td>
            </tr>)
            }
            </tbody>
        </table>
    );
};

