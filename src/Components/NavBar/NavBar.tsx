import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";


export const NavBar=()=>{
    let isLoggedIn=useSelector<RootReducerType,boolean>(state=> state.login.isLoggedIn)
    return(
        <div className={styles.navBarContainer}>
            {isLoggedIn?<NavLink to='/logout'>Logout</NavLink>:<NavLink to='/login'>Login</NavLink>}
            <NavLink to='/registration'>Registration</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/password-recovery'>Password Recovery</NavLink>
            <NavLink to='/new-password'>Create a new password</NavLink>
            <NavLink to='/test-components'>Test Components</NavLink>

        </div>
    )
}