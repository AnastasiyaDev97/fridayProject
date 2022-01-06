import s from './AddItem.module.scss'
import SuperInputText from "../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import React, {useState} from "react";

type addItemType = {
    title: string
    onAddItemButtonClick: (text:string) => void
}

export const AddItem = ({title,onAddItemButtonClick}: addItemType) => {
    const [text, setText] = useState<string>('')

    const onButtonClick=()=>{
        onAddItemButtonClick(text)
        setText('')
    }


    return (
        <div className={s.row}>
            <SuperInputText style={{width: '60%'}} value={text}
                            onChangeText={setText} /*onEnter={}*//>
            <SuperButton style={{width: '35%'}} onClick={onButtonClick}>{title}</SuperButton>
        </div>
    )
}
