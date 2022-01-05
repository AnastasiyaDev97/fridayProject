import React, {ChangeEvent, useState} from 'react';
import s from './TestComponents.module.css'
import SuperInputText from "./components/c1-SuperInputText/SuperInputText";
import SuperButton from "./components/c2-SuperButton/SuperButton";
import SuperCheckbox from "./components/c3-SuperCheckbox/SuperCheckbox";

type TestComponentsPropsType = {}

export const TestComponents = (props: TestComponentsPropsType) => {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

   /* const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }*/

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <div className={s.column}>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                   /* onEnter={showAlert}*/
                    error={error}
                    // spanClassName={s.testSpanError}
                />

                <SuperInputText
                    className={s.blue} // проверьте, рабоет ли смешивание классов
                />

                ----------------------------------------------------

                <SuperButton>
                    default
                </SuperButton>

                <SuperButton
                    red // пропсу с булевым значением не обязательно указывать true
                 /*   onClick={showAlert}>*/
                   /* delete /!*название кнопки попадёт в children*!/*/>
                </SuperButton>

                <SuperButton disabled>
                    disabled
                </SuperButton>

                ----------------------------------------------------

                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}>
                    some text {/*// этот текст попадёт в children*/}
                </SuperCheckbox>
                {/*// onChange тоже должен работать*/}
                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>

        </div>
    )
}