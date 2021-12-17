import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";


export const Profile=()=>{
    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return(
        <div>
            <div></div>
            Profile
        </div>
    )
}