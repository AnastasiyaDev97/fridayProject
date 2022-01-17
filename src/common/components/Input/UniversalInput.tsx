import styles from "./UniversalInput.module.scss"
import SuperInputText from "../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import React, {FC, memo, useState} from "react";
import {FieldInputProps} from "formik";

type universalInputPropsType = {
    validationErr: string
    formikProps: FieldInputProps<any>
    type?: string
    isPassword?: boolean
}

export const UniversalInput: FC<universalInputPropsType> = memo(({
                                                                     validationErr, formikProps, type,
                                                                     isPassword
                                                                 }) => {
    console.log('univ')
    let [passwordShown, setPasswordShown] = useState<boolean>(false);

    const typeForInput = !passwordShown && type ? 'password' : 'text'

    const toggleShowPassword = () => {
        setPasswordShown(!passwordShown)
    }

    return (
        <div className={styles.inputWrapper}>
            <SuperInputText className={styles.input}
                            placeholder={formikProps.name}
                            {...formikProps}
                            type={typeForInput}/>
            {isPassword && <span className={styles.togglePassBtn} onClick={toggleShowPassword}></span>}
            <div className={styles.error}>{validationErr}</div>
        </div>
    )
})
