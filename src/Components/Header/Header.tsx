import React, {memo} from 'react';
import styles from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {NavBar} from "../NavBar/NavBar";
import {logoutTC} from "../../store/thunks/login";


export const Header = memo(() => {
    const dispatch = useDispatch();

    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={styles.headerBlock}>
            <div className={styles.container}>
                <h2>CardsApp</h2>

                {isLoggedIn && <><NavBar/>
                    <span className={styles.logout} onClick={logoutHandler}>Logout</span>
                </>}
            </div>
        </div>
    )
})