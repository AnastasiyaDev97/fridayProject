import styles from "./UniversalInput.module.scss"
import SuperInputText from "../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import React, {useState} from "react";
import {FieldInputProps} from "formik";

type universalInputPropsType = {
    validationErr: string
    formikProps: FieldInputProps<any>
    type?: string
    isPassword?: boolean
}

export const UniversalInput = (props: universalInputPropsType) => {
    let [passwordShown, setPasswordShown] = useState(false);
    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }
    return (
        <div className={styles.inputWrapper}>
            <SuperInputText className={styles.input}
                            placeholder={props.formikProps.name}
                            {...props.formikProps}
                            type={!passwordShown && props.type ? 'password' : 'text'}/>
            {props.isPassword && <span className={styles.togglePassBtn} onClick={toggleShowPassword}></span>}
            <div className={styles.error}>{props.validationErr}</div>

        </div>
    )
}
