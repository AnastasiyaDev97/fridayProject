import SuperInputText from "../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import s from './EditableSpan.module.scss'

type editableSpanPropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}
export const EditableSpan:FC<editableSpanPropsType> = memo(({title,updateTitle}) => {
    console.log('editableSpan')
    let [edit, setEdit] = useState(true)
    let [name, setName] = useState(title)

    const activateInputMode = () => {
        setEdit(false)

    }
    const activateSpanMode = () => {
        setEdit(true)
        updateTitle(name)
    }
    const onActivateSpanModePress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
        setEdit(true)
        updateTitle(name)}
    }
    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)

    }
    return (
        edit ?
            <h2 onDoubleClick={activateInputMode}>{name}</h2>
            : <SuperInputText value={name} onBlur={activateSpanMode} autoFocus onChange={updateTitleHandler}
                              className={s.input} onKeyPress={onActivateSpanModePress}/>
    )
})