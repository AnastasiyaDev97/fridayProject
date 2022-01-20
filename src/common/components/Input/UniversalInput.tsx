import styles from "./UniversalInput.module.scss"
import SuperInputText from "../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import React, {FC, memo, useState} from "react";
import {FieldInputProps} from "formik";
import {INPUT_TYPE} from "../../../enum/InputType";

export type InputType= 'password'|'text'


type universalInputPropsType = {
    validationErr: string
    formikProps: FieldInputProps<any>
    type?: InputType
    isPassword?: boolean
}

export const UniversalInput: FC<universalInputPropsType> = memo(({
                                                                     validationErr, formikProps, type,
                                                                     isPassword
                                                                 }) => {

    let [passwordShown, setPasswordShown] = useState<boolean>(false);

    const typeForInput = !passwordShown && type ? INPUT_TYPE.PASSWORD : INPUT_TYPE.TEXT

    const onSpanToggleShowPasswordClick = () => {
        setPasswordShown(!passwordShown)
    }

    return (
        <div className={styles.inputWrapper}>
            <SuperInputText className={styles.input}
                            placeholder={formikProps.name}
                            {...formikProps}
                            type={typeForInput}/>
            {isPassword && <span className={styles.togglePassBtn} onClick={onSpanToggleShowPasswordClick}/>}
            <div className={styles.error}>{validationErr}</div>
        </div>
    )
})
