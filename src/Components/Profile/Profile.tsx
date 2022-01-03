import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {ResponseLoginType} from "../../dal/apiTypes";



export const Profile=()=>{
    console.log('profile')
    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const profile=useSelector<RootReducerType, ResponseLoginType>(state=>state.profile)

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return(
        <div>
            {profile.email}
        </div>
    )
}