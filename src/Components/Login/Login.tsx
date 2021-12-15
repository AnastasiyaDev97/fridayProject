import React, {useState} from 'react';
import SuperInputText from "../TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import SuperCheckbox from "../TestComponents/components/c3-SuperCheckbox/SuperCheckbox";
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {RequestStatusType} from "../../store/reducers/app-reducer";
import {loginTC} from "../../store/reducers/login-reducer";
import {Navigate} from 'react-router-dom';
import styles from './Login.module.scss'

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {
    let [passwordShown, setPasswordShown] = useState(false);
    const dispatch = useDispatch()
    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

  const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            }
            if (!values.password) {
                errors.password = "*Required";
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()

        },
    })
    let status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)
    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={styles.wrapper}>
            {status === 'loading' && <Preloader/>}
            <h2>Welcome</h2>
            <form className={styles.form} onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>
                <div className={styles.inputWrapper}>
                <SuperInputText placeholder='Email' {...formik.getFieldProps('email') }/>
                    {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>

               <div className={styles.inputWrapper}>
                <SuperInputText placeholder='Password'
                    type={passwordShown ? 'text' : 'password'} {...formik.getFieldProps('password')}/>
                   <span className={styles.togglePassBtn} onClick={toggleShowPassword}></span>
               </div>

                {formik.touched.password && formik.errors.password &&
                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <SuperCheckbox checked={formik.values.rememberMe}
                               {...formik.getFieldProps('rememberMe')}>Remember Me</SuperCheckbox>
                <SuperButton type="submit">Login</SuperButton>
            </form>
        </div>
    )
}