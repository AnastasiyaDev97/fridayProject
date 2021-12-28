import React, {useEffect} from 'react';
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {PackType} from "../../../dal/api";
import {getPacksTC} from "../../../store/reducers/packs-reducer";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";


export const Table = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!packs) {
            dispatch(getPacksTC())
        }
    }, [])
    const packs = useSelector<RootReducerType, Array<PackType> | null>(state => state.packs.packs)
    const userId = useSelector<RootReducerType, string>(state => state.profile.profile._id)
    const packsForTable = packs?.map(({
                                          cardsCount, created,
                                          name, updated, user_id, ...rest
                                      }) => ({
            name, cardsCount, updated, created, user_id
        })
    )
    packsForTable?.map(m=>{
        for(let key in m){

        }
    })

    const theadArr = ['Name', 'Cards', 'Last Updated', 'Created By', 'Actions']

    return (
        <table className={s.tableWrapper}>
            <thead>
            <tr>
                {theadArr.map(m => <th>{m}</th>)}
            </tr>
            </thead>
            <tbody>
            {packsForTable?.map((m) => <tr>
                {Object.values(m).map((m, i) => i !== 4 && <td>{m}</td>)}
                <td className={s.btns}>{m.user_id === userId &&
                <><SuperButton>Delete</SuperButton><SuperButton>Edit</SuperButton></>
                } <SuperButton>Learn</SuperButton></td>
            </tr>)
            }
            </tbody>
        </table>
    );
};

