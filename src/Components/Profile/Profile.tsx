import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {ResponseLoginType} from "../../dal/api";


export const Profile=()=>{

    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const profile=useSelector<RootReducerType, ResponseLoginType>(state=>state.profile.profile)

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return(
        <div>
            {profile.email}
        </div>
    )
}