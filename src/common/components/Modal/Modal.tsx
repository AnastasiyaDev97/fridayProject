import {FC, memo, ReactElement} from "react";
import s from './Modal.module.scss'
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {Nullable} from "../../../types/Nullable";


export type ModalPropsType = {
    modalBody?: {
        title: string
        btn: {
            title: string
            callback: () => void
        }
    }
}

export const Modal: FC<ModalPropsType> = memo((
    {
        children,
        modalBody
    }
): Nullable<ReactElement> => {

    if (modalBody) {
        return (
            <div className={
                s.modalWrapper}>
                <div className={s.modalBlock}>
                    <h3>
                        {modalBody.title}
                    </h3>
                    {children}
                    <SuperButton onClick={modalBody.btn.callback} className={s.btn}>
                        {modalBody.btn.title}</SuperButton>

                </div>
            </div>
        )
    }
    return null
})