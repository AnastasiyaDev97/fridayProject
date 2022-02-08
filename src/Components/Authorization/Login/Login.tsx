import React from 'react';
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import SuperCheckbox from "../../TestComponents/components/c3-SuperCheckbox/SuperCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {Navigate, NavLink} from 'react-router-dom';
import styles from './Login.module.scss'
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import {AuthData, validateLoginForm} from "../../../utils/validates";
import {EMPTY_STRING} from "../../../constants";
import {PATH} from "../../../enum/Path";
import {INPUT_TYPE} from "../../../enum/InputType";
import {BUTTON_TYPE} from "../../../enum/ButtonTyoe";
import {FORMIK_FIELDS_NAME} from "../../../enum/FormikFieldNames";
import {loginTC} from "../../../store/thunks/login";


export const Login = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: process.env.REACT_APP_EMAIL as string,
            password: process.env.REACT_APP_PASSWORD as string,
            rememberMe: false
        },
        validate: values => {
            const errors: AuthData = {};
            validateLoginForm(values,errors)
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))

        },
    });

    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)

    const conditionForDisableButton=!!(formik.errors.email||formik.errors.password)

    if (isLoggedIn) {
        return <Navigate to={PATH.START}/>
    }

    return (
        <div className={styles.wrapper}>
            <h2>Welcome</h2>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputsWrapper}>
                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || EMPTY_STRING}
                                    formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.EMAIL)}/>

                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || EMPTY_STRING}
                                    formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.PASSWORD)}
                                    type={INPUT_TYPE.PASSWORD}
                                    isPassword={true}/>

                </div>


                <div className={styles.row}>
                    <SuperCheckbox checked={formik.values.rememberMe}
                                   {...formik.getFieldProps(FORMIK_FIELDS_NAME.REMEMBER_ME)}>
                        Remember Me</SuperCheckbox>
                    <NavLink to={PATH.FORGOT_PASSWORD}>Lost Password?</NavLink>
                </div>
            <SuperButton className={styles.submitBtn} type={BUTTON_TYPE.SUBMIT} disabled={conditionForDisableButton}>
                    Login</SuperButton>

            </form>

            <NavLink className={styles.registerLink} to={PATH.REGISTRATION}>Register</NavLink>
        </div>
    )
}

