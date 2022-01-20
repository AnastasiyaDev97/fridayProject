import React from 'react';
import style from './NotFound.module.scss'
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "../../enum/Path";



export const NotFound=()=>{
    return(
        <div className={style.notFoundBackgr}>
            <div className={style.notFoundBlock}>
            <h2 >Not Found &#128532;</h2>
            <SuperButton><NavLink to={PATH.PROFILE} className={style.link}>Go Back</NavLink></SuperButton>
            </div>
        </div>
    )
}