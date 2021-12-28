import React from 'react';

import {useFormik} from "formik";


import {useDispatch, useSelector} from "react-redux";



import {Navigate} from 'react-router-dom';

import {loginTC} from "../../../store/reducers/login-reducer";
import {RootReducerType} from "../../../store/store";
import {validates} from "../../../utils/validates";


type propType={
    componentName:string
}

export const UniversalAuthorization = (props:propType) => {
     const dispatch = useDispatch()
     const formik = useFormik({
         initialValues: {
             email: '',
             password: '',
             rememberMe: false,
             confirmPassword: '',
         },
         validate: (values) => {
           validates(values)
         },

         onSubmit: values => {
             dispatch(loginTC(values))
             formik.resetForm()

         },
     })

     let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
     if (isLoggedIn) {
         return <Navigate to='/'/>
     }

    return (
        <>
     {/*   {props.componentName==='login'&&<Login formik={formik}/>}*/}
        </>
    )
}