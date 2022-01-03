import React from 'react';
import {useFormik} from "formik";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {Navigate, useNavigate} from "react-router-dom";
import {registerMeTC, registerStatusAC} from "../../../store/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import styles from "../Login/Login.module.scss";

import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import {validates} from "../../../utils/validates";


export const Registration = () => {
    console.log('regis')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            validates(values)
        },

        onSubmit: values => {
            dispatch(registerMeTC(values.email, values.password))
            formik.resetForm()


        },
    })
    const cancelHandler = () => {
        formik.resetForm()
        navigate('/login')
    }
    let registerStatus = useSelector<RootReducerType, boolean>(state => state.register.registerStatus)
    if (registerStatus) {
        dispatch(registerStatusAC(false))
        return <Navigate to={'/login'}/>
    }
    return (

        <div className={styles.wrapper}>
            <h2>Sign up</h2>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.inputsWrapper}>

                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || ''}
                                    formikProps={formik.getFieldProps('email')}/>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || ''}
                                    formikProps={formik.getFieldProps('password')} type='password'
                                    isPassword={true}/>
                    <UniversalInput
                        validationErr={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                        formikProps={formik.getFieldProps('confirmPassword')} type='password'
                        isPassword={true}/>

                </div>
                <div className={styles.row}>
                    <div className={styles.registrationBtns}>
                        <SuperButton type='button' onClick={cancelHandler}>Cancel</SuperButton>
                        <SuperButton type='submit'>Register</SuperButton>
                    </div>
                </div>
            </form>
        </div>
    )
}