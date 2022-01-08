import { FC, memo, useState} from "react";
import {Modal} from "../Modal";
import {modalTypeT} from "../../../../Components/Packs/PacksList/PacksList";
import SuperInputText from "../../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {addPackTC, deletePackTC, updatePackTC} from "../../../../store/reducers/packs-reducer";
import {useDispatch} from "react-redux";
import s from './ModalContainer.module.scss'

type ModalContainerPropsType = {
    onCloseModalButtonClick: () => void
    type: modalTypeT
    propsForModal: any
}

export const ModalContainer: FC<ModalContainerPropsType> = memo((
    {
        onCloseModalButtonClick,
        type,
        propsForModal
    }
) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')

    const onSaveButtonClick = () => {
        dispatch(addPackTC(name))
        onCloseModalButtonClick()
    }
    const onDeleteButtonClick = () => {
        dispatch(deletePackTC(propsForModal))
        onCloseModalButtonClick()
    }

    const onUpdatePackClick = () => {
        dispatch(updatePackTC(propsForModal, name))
        onCloseModalButtonClick()
    }

    const modals = {
        'addPack': {title: 'Add new Pack', btn: {title: 'Save', callback: onSaveButtonClick}},
        'deletePack': {title: 'Delete Pack', btn: {title: 'Delete', callback: onDeleteButtonClick}},
        'updatePack': {title: 'Update Pack', btn: {title: 'Update', callback: onUpdatePackClick}},
    }


    let modalBody;
    if (type === 'addPack') {
        modalBody = modals.addPack
    }
    if (type === 'deletePack') {
        modalBody = modals.deletePack
    }
    if (type === 'updatePack') {
        modalBody = modals.updatePack
    }

    return (
        <Modal modalBody={modalBody}>
            {type === 'deletePack' &&
            <span className={s.span}>Do you really want to remove this Pack?
                <br/>All cards will be excluded from this course</span>}
            {(type === 'addPack' || type === 'updatePack') &&
            <SuperInputText className={s.input} value={name} onChangeText={setName}/>}
            <SuperButton onClick={onCloseModalButtonClick}>Cancel</SuperButton>
        </Modal>
    )
})