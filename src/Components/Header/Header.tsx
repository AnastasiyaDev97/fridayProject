import React from 'react';

import styles from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {logoutTC} from "../../store/reducers/login-reducer";


export const Header = () => {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        dispatch(logoutTC())
    }
    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)

    return (
        <div className={styles.headerBlock}>
            <div className={styles.container}>

                <h2>CardsApp</h2>
         {/*       <NavBar/>*/}
                {isLoggedIn && <span className={styles.logout} onClick={logoutHandler}>Logout</span>}
            </div>
        </div>
    )
}