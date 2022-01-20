import {FC, memo, ReactElement} from "react";
import s from './Modal.module.scss'
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {Nullable} from "../../../types/Nullable";
import {modalActionType} from "./ModalContainer/ModalContainer";
import {MODAL_ACTION} from "../../../enum/ModalAction";


export type ModalPropsType = {
    modalBody?: {
        title: string
        btn: {
            title: string
            callback: () => void
        }
    }
    onCloseModalButtonClick: () => void
    isActivePrevBtn: boolean
    modalAction: modalActionType
    onNextCardButtonClick: () => void
}

export const Modal: FC<ModalPropsType> = memo((
    {
        children,
        modalBody,
        onCloseModalButtonClick,
        modalAction,
        onNextCardButtonClick,
        isActivePrevBtn
    }
): Nullable<ReactElement> => {

    const conditionForDisabledPrevBtn = modalAction === MODAL_ACTION.LEARN ? !isActivePrevBtn : false

    if (modalBody) {
        return (
            <div className={s.modalWrapper}>
                <div className={s.modalBlock}>
                    <h3>
                        {modalBody.title}
                    </h3>
                    {children}

                    <div className={s.buttons}>
                        <SuperButton onClick={modalBody.btn.callback} className={s.btn}
                                     disabled={conditionForDisabledPrevBtn}>
                            {modalBody.btn.title}</SuperButton>
                        {modalAction === MODAL_ACTION.LEARN &&
                        <SuperButton onClick={onNextCardButtonClick}>
                            Next</SuperButton>}
                        <SuperButton onClick={onCloseModalButtonClick} className={s.btn}>Cancel</SuperButton>
                    </div>

                </div>
            </div>
        )
    }
    return null
})