import React from 'react';
import styles from "../Login/Login.module.scss";
import {UniversalInput} from "../../common/components/Input/UniversalInput";
import {NavLink} from "react-router-dom";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import {authorizationAPI} from "../../dal/api";

type FormikErrorType = {
    email?: string
}

export const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },

        onSubmit: values => {
            authorizationAPI.sendPassword(values.email)
            formik.resetForm()
        },
    })
    return (
        <div className={styles.wrapper}>
            <h2>Forgot your password?</h2>
            <form className={styles.form} onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>
                <div className={styles.inputsWrapper}>
                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || ''}
                                    formikProps={formik.getFieldProps('email')}/>
                </div>
                <div>
                    Enter your email address and we will send you further instructions
                </div>
                <SuperButton className={styles.submitBtn} type="submit">Send instructions</SuperButton>
            </form>
            <div>Do you remember your password?</div>
            <NavLink className={styles.registerLink} to='/login'>Try logging in</NavLink>
        </div>
    )
}