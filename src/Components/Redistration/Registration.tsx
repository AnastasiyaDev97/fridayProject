import React from 'react';
import {useFormik} from "formik";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {Navigate} from "react-router-dom";
import {registerMeTC, registerStatusAC} from "../../store/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import styles from "../Login/Login.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import {RequestStatusType} from "../../store/reducers/app-reducer";
import {UniversalInput} from "../../common/components/Input/UniversalInput";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}


export const Registration = () => {
    const dispatch = useDispatch()
    let status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const passwordRegex = /(?=.*[0-9])/
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
                errors.password = "Invalid password. Must contain one number.";
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
            }
            if (values.password && values.confirmPassword) {
                if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Password not matched";
                }
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(registerMeTC(values.email, values.password))
            formik.resetForm()


        },
    })

    let registerStatus = useSelector<RootReducerType, boolean>(state => state.register.registerStatus)
    if (registerStatus) {
        dispatch(registerStatusAC(false))
        return <Navigate to={'/login'}/>
    }
    return (

        <div className={styles.wrapper}>
            <h2>Sign up</h2>
            {status === 'loading' && <Preloader/>}
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.inputsWrapper}>

                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || ''}
                                    formikProps={formik.getFieldProps('email')}/>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || ''}
                                    formikProps={formik.getFieldProps('password')} type='password'
                                    isPassword={true}/>
                    <UniversalInput validationErr={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                                    formikProps={formik.getFieldProps('confirmPassword')} type='password'
                                    isPassword={true}/>

                </div>
                <div className={styles.row}>
                    <div className={styles.registrationBtns}>
                        <SuperButton type='button'>Cancel</SuperButton>
                        <SuperButton type="submit">Register</SuperButton>
                    </div>
                </div>
            </form>
        </div>
    )
}