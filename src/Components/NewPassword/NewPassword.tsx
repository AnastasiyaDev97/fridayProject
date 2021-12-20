import React from 'react';
import styles from "../Login/Login.module.scss";
import {UniversalInput} from "../../common/components/Input/UniversalInput";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";

import {useFormik} from "formik";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {
    setNewPasswordTC,
    SetResponseInfoNewPassAC
} from "../../store/reducers/passwordRecovery-reducer";

type FormikErrorType = {
    password?: string
}

export const NewPassword = () => {
    const dispatch = useDispatch()
    const params = useParams<'*'>()
    const some = params['*']

    const responseInfoNewPass = useSelector<RootReducerType, string>(state => state.passRecovery.responseInfoNewPass)

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            const passwordRegex = /(?=.*[0-9])/
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
                errors.password = "Invalid password. Must contain one number.";

            }
            return errors;
        },

        onSubmit: values => {
            let newPassDataType = {
                password: values.password,
                resetPasswordToken: some || ''
            }
            dispatch(setNewPasswordTC(newPassDataType))
        },
    })
    if(responseInfoNewPass){
        dispatch(SetResponseInfoNewPassAC(''))
       return <Navigate to='/login'/>
    }
    return (
        <div className={styles.wrapper}>
            <h2>Create new password</h2>
            <form className={styles.form} onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>
                <div className={styles.inputsWrapper}>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || ''}
                                    formikProps={formik.getFieldProps('password')} type='password'
                                    isPassword={true}/>
                </div>
                <SuperButton className={styles.submitBtn} type="submit">Create new password</SuperButton>
            </form>

        </div>
    )
}