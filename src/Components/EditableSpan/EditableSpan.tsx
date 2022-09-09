import SuperInputText from "../TestComponents/components/c1-SuperInputText/SuperInputText";
import {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import style from './EditableSpan.module.scss'

type editableSpanPropsType = {
    title: string
    updateTitle: (newTitle: string) => void
}
export const EditableSpan: FC<editableSpanPropsType> = memo(({title, updateTitle}) => {

    let [isEdit, toggleEdit] = useState(true)
    let [name, setName] = useState(title)

    const onActivateInputModeDblClick = () => {
        toggleEdit(false)
    }

    const onInputActivateSpanModeBlur = () => {
        toggleEdit(true)
        updateTitle(name)
    }

    const onInputActivateModePress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            toggleEdit(true)
            updateTitle(name)
        }
    }

    const onInputUpdateTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return (
        isEdit ?
            <span onDoubleClick={onActivateInputModeDblClick} className={style.span}>{name}</span>
            : <SuperInputText value={name} onBlur={onInputActivateSpanModeBlur} autoFocus
                              onChange={onInputUpdateTitleChange}
                              className={style.input} onKeyPress={onInputActivateModePress}/>
    )
})