import React from 'react';

import styles from './Header.module.scss'


export const Header = () => {
    return (
        <div className={styles.headerBlock}>
            <div className={styles.container}>
                <h2>CardsApp</h2>
            </div>
        </div>
    )
}