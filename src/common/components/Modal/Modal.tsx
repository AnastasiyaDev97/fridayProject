import {FC, memo, ReactElement} from "react";
import s from './Modal.module.scss'
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {Nullable} from "../../../types/Nullable";
import {modalActionType} from "./ModalContainer/ModalContainer";


export type ModalPropsType = {
    modalBody?: {
        title: string
        btn: {
            title: string
            callback: () => void
        }
    }
    onCloseModalButtonClick:()=>void
    isActiveModalBtn:boolean
    isActivePrevBtn:boolean
    onPrevCardButtonClick:()=>void
    modalAction:modalActionType
}

export const Modal: FC<ModalPropsType> = memo((
    {
        children,
        modalBody,
        onCloseModalButtonClick,
        isActiveModalBtn,
        isActivePrevBtn,
        onPrevCardButtonClick,
        modalAction
    }
): Nullable<ReactElement> => {

    if (modalBody) {
        return (
            <div className={s.modalWrapper}>
                <div className={s.modalBlock}>
                    <h3>
                        {modalBody.title}
                    </h3>
                    {children}
                    <div className={s.buttons}>
                    <SuperButton onClick={modalBody.btn.callback} className={s.btn} disabled={!isActiveModalBtn}>
                        {modalBody.btn.title}</SuperButton>
                    {modalAction==='learn'&& <SuperButton onClick={onPrevCardButtonClick}  disabled={!isActivePrevBtn}>
                        Prev</SuperButton>}
                    <SuperButton onClick={onCloseModalButtonClick} className={s.btn}>Cancel</SuperButton>
                    </div>
                </div>
            </div>
        )
    }
    return null
})