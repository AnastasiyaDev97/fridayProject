
import React, {useState} from "react";

type addItemType = {
    title: string
    onAddItemButtonClick: (text:string) => void
}

export const SearchAddItem = ({title,onAddItemButtonClick}: addItemType) => {
    const [text, setText] = useState<string>('')

    const onButtonClick=()=>{
        onAddItemButtonClick(text)
        setText('')
    }


    return (<></>
      /*  <div className={s.row}>
            <i className="fas fa-search"></i>
            <SuperInputText style={{width: '60%'}} value={text}
                            onChangeText={setText} onEnter={handleSearchPack}/>

            <SuperButton style={{width: '35%'}} /!*onClick={}*!/>{title}</SuperButton>
        </div>*/
    )
}
