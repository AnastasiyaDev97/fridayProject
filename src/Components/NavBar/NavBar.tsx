import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavBar.module.scss'


export const NavBar = () => {
    return (
        <div className={styles.navBarContainer}>

                <NavLink to='/profile' className={({isActive}) => isActive ? `${styles.active}` : ``}>Profile</NavLink>


                <NavLink to='/packs' className={({isActive}) => isActive ? `${styles.active}` : ``}>Packs List</NavLink>

        </div>
    )
}