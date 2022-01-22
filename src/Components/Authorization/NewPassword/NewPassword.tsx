import React from 'react';
import styles from "../Login/Login.module.scss";
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {EMPTY_STRING} from "../../../constants";
import {setNewPasswordTC} from "../../../store/thunks/passwordRecovery";
import {PATH} from "../../../enum/Path";
import {FORMIK_FIELDS_NAME} from "../../../enum/FormikFieldNames";
import {INPUT_TYPE} from "../../../enum/InputType";
import {BUTTON_TYPE} from "../../../enum/ButtonTyoe";
import {AuthData, validateNewPasswordForm} from "../../../utils/validates";


export const NewPassword = () => {
    const dispatch = useDispatch()

    const {token} = useParams<string>()


    const responseInfoNewPass = useSelector<RootReducerType, string>(state => state.passRecovery.responseInfoNewPass)

    const formik = useFormik({
        initialValues: {
            password: EMPTY_STRING,
        },

        validate: values => {
            const errors: AuthData = {};
            validateNewPasswordForm(values, errors)
            return errors;

        },

        onSubmit: values => {
            let newPassDataType = {
                password: values.password,
                resetPasswordToken: token || EMPTY_STRING
            }
            dispatch(setNewPasswordTC(newPassDataType))
            formik.resetForm()
        },
    })

    if (responseInfoNewPass) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.wrapper}>
            <h2>Create new password</h2>
            <form className={styles.form} onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>

                <div className={styles.inputsWrapper}>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || EMPTY_STRING}
                                    formikProps={formik.getFieldProps(FORMIK_FIELDS_NAME.PASSWORD)}
                                    type={INPUT_TYPE.PASSWORD}
                                    isPassword={true}/>
                </div>

                <SuperButton className={styles.submitBtn} type={BUTTON_TYPE.SUBMIT}>Create new password</SuperButton>
            </form>
        </div>
    )
}