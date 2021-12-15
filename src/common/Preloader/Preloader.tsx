import preload from './../../assets/image/circles.svg'
import React from "react";

const Preloader = () => {
    return (
        <img src={preload} alt='waiting...'/>)
}

export default Preloader