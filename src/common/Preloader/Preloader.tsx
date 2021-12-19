import preload from './../assets/svg/oval.svg'
import React from "react";

const Preloader = () => {
    return (
        <img src={preload} alt='waiting...' style={{width:'90px'}}/>)
}

export default Preloader