import React, { ComponentType } from "react"
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {Navigate} from "react-router-dom";

export function withRedirect<T>(Component: ComponentType<T>) {

    let RedirectComponent = (props:T) => {
        let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)

        if (!isLoggedIn) {
            return <Navigate to='/login'/>
        }
        return <Component {...props}/>
    }
    return RedirectComponent
}