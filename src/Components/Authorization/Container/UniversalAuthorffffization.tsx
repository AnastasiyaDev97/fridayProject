import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {RootReducerType} from "../../../store/store";
import {Navigate, NavLink} from "react-router-dom";
import React from "react";
import styles from "../Login/Login.module.scss";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {ComponentAuthType} from "../../../App";
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import SuperCheckbox from "../../TestComponents/components/c3-SuperCheckbox/SuperCheckbox";
import {
    addEmailAC, SetResponseInfoForgotPassAC,
    SetResponseInfoNewPassAC
} from "../../../store/reducers/passwordRecovery-reducer";
import {validates} from "../../../utils/validates";


type UniversalAuthorizationPropsType = {
    title: string
    onSubmitHandler: () => void
    submitBtnTitle: string
    component: ComponentAuthType
    path: string
    linkTitle: string
}

export const UniversalAuthorffffization = (props: UniversalAuthorizationPropsType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
        },
        validate: (values) => {
           validates(values)
        },

        onSubmit: values => {
            props.onSubmitHandler()
        },
    })
   /* const cancelHandler = () => {
        formik.resetForm()
    }*/
    const toggleSendPasswordStatus = () => {
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
                                 onClick={toggleSendPasswordStatus}>Ok</SuperButton></div>


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