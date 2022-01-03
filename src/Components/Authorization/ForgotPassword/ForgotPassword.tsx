import {memo, useCallback} from 'react';
import styles from "../Login/Login.module.scss";
import {UniversalInput} from "../../../common/components/Input/UniversalInput";
import {NavLink} from "react-router-dom";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import {
    addEmailAC,
    sendPassword,
    SetResponseInfoForgotPassAC
} from "../../../store/reducers/passwordRecovery-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {validates} from "../../../utils/validates";


export const ForgotPassword = () => {
    console.log('forgot')
    const dispatch = useDispatch()
    const emailForRecovery = useSelector<RootReducerType, null | string>(state => state.passRecovery.emailForRecovery)
    const responseInfoForgotPass = useSelector<RootReducerType, string>(state => state.passRecovery.responseInfoForgotPass)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
         validates(values)
        },

        onSubmit: values => {
            dispatch(sendPassword(values.email))

        },
    })
    const toggleSensPassStatus = useCallback(() => {
        dispatch(SetResponseInfoForgotPassAC(''))
        dispatch(addEmailAC(''))
    },[dispatch])

    return (
        <div className={styles.wrapper}>

            {responseInfoForgotPass ? <div className={styles.sendMailBlock}>
                    <h2>Check email</h2>
                    <div>We've sent an Email with instructions to {emailForRecovery}</div>
                    <SuperButton className={styles.sendMailBtn} type='button'
                                 onClick={toggleSensPassStatus}>Ok</SuperButton></div>

                : <>
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
                </>}
        </div>
    )
}