import React, {useCallback, useEffect} from 'react';
import {useFormik} from "formik";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {Navigate, useNavigate} from "react-router-dom";
import {registerStatusAC} from "../../../store/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import styles from "../Login/Login.module.scss";
import {UniversalInput} from "../../../common/components/Input/UniversalInput";

import {EMPTY_STRING} from "../../../constants";
import {registerMeTC} from "../../../store/thunks/registration";
import {PATH} from "../../../enum/Path";
import {FORMIK_FIELDS_NAME} from "../../../enum/FormikFieldNames";
import {INPUT_TYPE} from "../../../enum/InputType";
import {BUTTON_TYPE} from "../../../enum/ButtonTyoe";
import {AuthData, validates} from "../../../utils/validates";


export const Registration = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    let registerStatus = useSelector<RootReducerType, boolean>(state => state.register.registerStatus)

    const formik = useFormik({
        initialValues: {
            email: EMPTY_STRING,
            password: EMPTY_STRING,
            confirmPassword: EMPTY_STRING,
        },

        validate: values => {
            const errors: AuthData = {};
            validates(values, errors)
            return errors;
        },

        onSubmit: values => {
            dispatch(registerMeTC(values.email, values.password))
            formik.resetForm()
        },
    })

    useEffect(() => {
        return () => {
            dispatch(registerStatusAC(false))
        }
    })

    const onCancelButtonClick = useCallback(() => {
        formik.resetForm()
        navigate(PATH.LOGIN)
    }, [formik, navigate])

    if (registerStatus) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.wrapper}>
            <h2>Sign up</h2>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.inputsWrapper}>

                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || EMPTY_STRING}
                                    formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.EMAIL)}/>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || EMPTY_STRING}
                                    formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.PASSWORD)}
                                    type={INPUT_TYPE.PASSWORD}
                                    isPassword={true}/>
                    <UniversalInput
                        validationErr={(formik.touched.confirmPassword && formik.errors.confirmPassword) || EMPTY_STRING}
                        formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.CONFIRM_PASSWORD)}
                        type={INPUT_TYPE.PASSWORD}
                        isPassword={true}/>
                </div>

                <div className={styles.row}>
                    <div className={styles.registrationBtns}>
                        <SuperButton type={BUTTON_TYPE.BUTTON} onClick={onCancelButtonClick}>Cancel</SuperButton>
                        <SuperButton type={BUTTON_TYPE.SUBMIT}>Register</SuperButton>
                    </div>
                </div>
            </form>
        </div>
    )
}