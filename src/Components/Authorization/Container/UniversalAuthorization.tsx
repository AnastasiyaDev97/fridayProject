import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {RootReducerType} from "../../../store/store";
import {Navigate, NavLink} from "react-router-dom";
import React from "react";
import styles from "../../Login/Login.module.scss";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {ComponentAuthType} from "../../../App";
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import SuperCheckbox from "../../TestComponents/components/c3-SuperCheckbox/SuperCheckbox";
import {
    addEmailAC, SetResponseInfoForgotPassAC,
    SetResponseInfoNewPassAC
} from "../../../store/reducers/passwordRecovery-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
    rememberMe?: boolean
}
type UniversalAuthorizationPropsType = {
    title: string
    onSubmitHandler: () => void
    submitBtnTitle: string
    component: ComponentAuthType
    path: string
    linkTitle: string
}

export const UniversalAuthorization = (props: UniversalAuthorizationPropsType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
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
            props.onSubmitHandler()
        },
    })
   /* const cancelHandler = () => {
        formik.resetForm()
    }*/
    const toggleSensPassStatus = () => {
        dispatch(SetResponseInfoForgotPassAC(''))
        dispatch(addEmailAC(''))
    }
    let responseInfoNewPass = useSelector<RootReducerType, string>(state => state.passRecovery.responseInfoNewPass)
    let emailForRecovery = useSelector<RootReducerType, null | string>(state => state.passRecovery.emailForRecovery)
    let responseInfoForgotPass = useSelector<RootReducerType, string>(state => state.passRecovery.responseInfoForgotPass)
    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }
    if (responseInfoNewPass) {
        dispatch(SetResponseInfoNewPassAC(''))
        return <Navigate to='/login'/>
    }
    return (
        <div className={styles.wrapper}>
            {responseInfoForgotPass ? <div className={styles.sendMailBlock}>
                    <h2>Check email</h2>
                    <div>We've sent an Email with instructions to {emailForRecovery}</div>
                    <SuperButton className={styles.sendMailBtn} type='button'
                                 onClick={toggleSensPassStatus}>Ok</SuperButton></div>


                : <>
                    <h2>{props.title}</h2>
                    <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <div className={styles.inputsWrapper}>

                            {props.component !== 'newPass' &&
                            <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || ''}
                                            formikProps={formik.getFieldProps('email')}/>}

                            {props.component !== 'forgotPass' &&
                            <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || ''}
                                            formikProps={formik.getFieldProps('password')} type='password'
                                            isPassword={true}/>}

                            {props.component === 'register' &&
                            <UniversalInput
                                validationErr={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
                                formikProps={formik.getFieldProps('confirmPassword')} type='password'
                                isPassword={true}/>}


                        </div>
                        <div className={styles.row}>
                            {props.component === 'login' && <><SuperCheckbox checked={formik.values.rememberMe}
                                                                             {...formik.getFieldProps('rememberMe')}>Remember
                                Me</SuperCheckbox>
                                <NavLink to='/forgot-password'>Lost Password?</NavLink></>}
                            {props.component === 'forgotPass' && ' Enter your email address and we will send you further instructions'}
                        </div>

                        <SuperButton className={styles.submitBtn} type='submit'>{props.submitBtnTitle}</SuperButton>

                    </form>
                    {props.component === 'forgotPass' && <div>Do you remember your password?</div>}
                    {(props.component !== 'register' || 'newPass') &&
                    <NavLink className={styles.registerLink} to={props.path}>
                        {props.linkTitle}</NavLink>}
                </>}
        </div>
    )
}