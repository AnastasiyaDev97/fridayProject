import React from 'react';
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import SuperCheckbox from "../../TestComponents/components/c3-SuperCheckbox/SuperCheckbox";

import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";

import {loginTC} from "../../../store/reducers/login-reducer";
import {Navigate, NavLink} from 'react-router-dom';
import styles from './Login.module.scss'
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import {validates} from "../../../utils/validates";


export const Login = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
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
        <div className={styles.wrapper}>
            <h2>Welcome</h2>
            <form className={styles.form} onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>
                <div className={styles.inputsWrapper}>
                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || ''}
                                    formikProps={formik.getFieldProps('email')}/>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || ''}
                                    formikProps={formik.getFieldProps('password')} type='password'
                                    isPassword={true}/>

                </div>
                <div className={styles.row}>
                    <SuperCheckbox checked={formik.values.rememberMe}
                                   {...formik.getFieldProps('rememberMe')}>Remember Me</SuperCheckbox>
                    <NavLink to='/forgot-password'>Lost Password?</NavLink>
                </div>
                <SuperButton className={styles.submitBtn} type="submit">Login</SuperButton>
            </form>

            <NavLink className={styles.registerLink} to='/registration'>Register</NavLink>
        </div>
    )
}