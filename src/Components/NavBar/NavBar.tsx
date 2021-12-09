import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'


export const NavBar=()=>{
    return(
        <div className={styles.navBarContainer}>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/registration'>Registration</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/password-recovery'>Password Recovery</NavLink>
            <NavLink to='/new-password'>Create a new password</NavLink>
            <NavLink to='/test-components'>Test Components</NavLink>

        </div>
    )
}