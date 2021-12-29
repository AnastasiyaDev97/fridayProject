import preload from './../assets/svg/oval.svg'
import React from "react";
import s from './Preloader.module.scss'


const Preloader = () => {
    return (
        <img src={preload} alt='waiting...'  className={s.loading}/>)
}

export default Preloader