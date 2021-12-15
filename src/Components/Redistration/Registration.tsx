import React from 'react';
import SuperInputText from "../TestComponents/components/c1-SuperInputText/SuperInputText";
import {useFormik} from "formik";
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {Navigate} from "react-router-dom";
import {registerMeTC} from "../../store/reducers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}


export const Registration = () => {
    const dispatch=useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
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
                errors.password = "*Required";
            } else if (values.password.length < 8) {
                errors.password = "*Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
                errors.password = "*Invalid password. Must contain one number.";
            }
            if (values.password && values.confirmPassword) {
                if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Password not matched";
                }
            }
            return errors;
        },

        onSubmit: values => {
            debugger
            dispatch(registerMeTC(values.email, values.password))
            formik.resetForm()


        },
    })

    let registerStatus = useSelector<RootReducerType, boolean>(state => state.register.registerStatus)
    if (registerStatus) {
        debugger
        return <Navigate to={'/login'}/>
    }
    return (

        <div>
            <h4>Sign up</h4>
            <form onSubmit={formik.handleSubmit}>
                <label><SuperInputText {...formik.getFieldProps('email')}/>Email</label>
                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <label><SuperInputText type='password' {...formik.getFieldProps('password')}/>Password</label>
                {formik.touched.password && formik.errors.password &&
                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                <label><SuperInputText type='password' {...formik.getFieldProps('confirmPassword')}/>Confirm
                    password</label>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>)}
                <SuperButton type='button'>Cancel</SuperButton>
                <SuperButton type="submit">Register</SuperButton>
            </form>
        </div>
    )
}