import React, {useCallback} from 'react';
import styles from "../Login/Login.module.scss";
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import {NavLink, useNavigate} from "react-router-dom";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import {addEmailAC, SetResponseInfoForgotPassAC} from "../../../store/reducers/passwordRecovery-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";

import {EMPTY_STRING} from "../../../constants";
import {PATH} from "../../../enum/Path";
import {BUTTON_TYPE} from "../../../enum/ButtonTyoe";
import {sendPassword} from "../../../store/thunks/passwordRecovery";
import {AuthData, validateForgotPasswordForm} from "../../../utils/validates";


export const ForgotPassword = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const emailForRecovery = useSelector<RootReducerType, null | string>(state => state.passRecovery.emailForRecovery)
    const responseInfoForgotPass = useSelector<RootReducerType, string>(state => state.passRecovery.responseInfoForgotPass)

    const formik = useFormik({
        initialValues: {
            email: EMPTY_STRING,
        },
        validate: values => {
            const errors: AuthData = {};
            validateForgotPasswordForm(values, errors)
            return errors;
        },

        onSubmit: values => {
            dispatch(sendPassword(values.email))
            formik.resetForm()
        },
    })

    const onButtonTogglePasswordStatusClick = useCallback(() => {
        dispatch(SetResponseInfoForgotPassAC(EMPTY_STRING))
        dispatch(addEmailAC(EMPTY_STRING))
        navigate(PATH.LOGIN)
    }, [dispatch,navigate])

    return (
        <div className={styles.wrapper}>

            {responseInfoForgotPass ?
                <div className={styles.sendMailBlock}>
                    <h2>Check email</h2>
                    <div className={styles.sendMailMessage}>We've sent an Email with instructions
                        to {emailForRecovery}</div>
                    <SuperButton className={styles.sendMailBtn} type={BUTTON_TYPE.BUTTON}
                                 onClick={onButtonTogglePasswordStatusClick}>Ok</SuperButton>
                </div>

                : <>
                    <h2>Forgot your password?</h2>
                    <form className={styles.form} onSubmit={(e) => {
                        formik.handleSubmit(e)
                    }}>
                        <div className={styles.inputsWrapper}>
                            <UniversalInput
                                validationErr={(formik.touched.email && formik.errors.email) || EMPTY_STRING}
                                formikProps={formik.getFieldProps('email')}/>
                        </div>

                        <div>
                            Enter your email address and we will send you further instructions
                        </div>

                        <SuperButton className={styles.submitBtn} type={BUTTON_TYPE.SUBMIT}>Send
                            instructions</SuperButton>
                    </form>
                    <div>Do you remember your password?</div>
                    <NavLink className={styles.registerLink} to={PATH.LOGIN}>Try logging in</NavLink>
                </>}
        </div>
    )
}