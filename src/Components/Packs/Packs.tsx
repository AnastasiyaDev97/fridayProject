import React from 'react';
import s from './Packs.module.scss'
import {PacksParams} from "./PacksParams/PacksParams";
import {PacksList} from "./PacksList/PacksList";
import { useSelector} from "react-redux";

import {RootReducerType} from "../../store/store";
import {Navigate} from "react-router-dom";



export const Packs = () => {



    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }


    return (
        <div className={s.wrapper}>
            <PacksParams/>
            <PacksList/>
        </div>
    )
}