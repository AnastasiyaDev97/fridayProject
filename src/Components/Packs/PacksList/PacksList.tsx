import s from './PacksList.module.scss'
import React from 'react';
import {Table} from "../../../features/cards/table/Table";
import SuperInputText from "../../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";


export const PacksList = () => {
    return (
        <div className={s.listWrapper}>
            <h2>Packs List</h2>
            <div className={s.row}>
                <SuperInputText style={{width:'60%'}}/>
                <SuperButton style={{width:'35%'}}>Add new pack</SuperButton>
            </div>
            <Table />
        </div>
    )
}