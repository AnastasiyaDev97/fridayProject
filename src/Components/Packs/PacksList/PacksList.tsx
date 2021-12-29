import s from './PacksList.module.scss'
import React from 'react';
import {Table} from "../../../features/cards/table/Table";
import SuperInputText from "../../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import Paginator from "../../../features/cards/pagination/Pagination";
import {useDispatch} from "react-redux";
import {changePageAC} from "../../../store/reducers/packs-reducer";
import {PackType} from "../../../dal/api";
type PackListPropsType={
    packs:Array<PackType>
    currentPage:number
    totalItemCount:number
    pageSize:number
}

export const PacksList = (props:PackListPropsType) => {
    const dispatch = useDispatch()

    const changePageHandler=(page:number)=>{
        dispatch(changePageAC(page))
    }

    return (
        <div className={s.listWrapper}>
            <h2>Packs List</h2>
            <div className={s.row}>
                <SuperInputText style={{width:'60%'}}/>
                <SuperButton style={{width:'35%'}}>Add new pack</SuperButton>
            </div>
            <Table packs={props.packs}/>
            <Paginator totalItemCount={props.totalItemCount} pageSize={props.pageSize} currentPage={props.currentPage}
                       changePageHandler={changePageHandler} portionSize={10}/>
        </div>
    )
}