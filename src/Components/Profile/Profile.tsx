import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {withRedirect} from "../../common/hoc/withRedirect";
import style from './Profile.module.scss'
import SuperInputText from "../TestComponents/components/c1-SuperInputText/SuperInputText";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";
import {updatePackTC} from "../../store/thunks/packs";
import {EMPTY_STRING} from "../../constants";


const Profile = () => {
    const dispatch = useDispatch()

    const avatar = useSelector<RootReducerType, string>(state => state.profile.avatar)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const name = useSelector<RootReducerType, string>(state => state.profile.name)
    const publicCardPacksCount = useSelector<RootReducerType, number>(state => state.profile.publicCardPacksCount)

    const [avatarURL, setAvatarURL] = useState<string>(EMPTY_STRING)
    const [isInputActive, setIsInputActive] = useState<boolean>(false)

    const onChangePhotoClick = () => {
        setIsInputActive(true)
    }

    const onInputForURLChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatarURL(e.currentTarget.value)
    }

    const onAddNewPhotoClick = () => {
        dispatch(updatePackTC(name, avatarURL))
        setIsInputActive(false)
        setAvatarURL(EMPTY_STRING)
    }

    const onInputForURLKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddNewPhotoClick()
        }
    }

    const onUpdateTitle = (newTitle: string) => {
        if (newTitle !== name) {
            dispatch(updatePackTC(newTitle, avatarURL))
        }
    }

    return (
        <div className={style.profileWrapper}>
            <div className={style.avatarBlock}>

                <div className={style.avatarWrapper}>
                    <div className={style.tooltip} onClick={onChangePhotoClick}>Change Photo</div>
                    <img alt='avatar' className={style.avatar} src={avatar}/>
                </div>

                {isInputActive &&

                <div className={style.inputForURL}><SuperInputText className={style.input} value={avatarURL}
                                                                   onChange={onInputForURLChange}
                                                                   onKeyPress={onInputForURLKeyPress}
                                                                   autoFocus placeholder={'Add URL'}/>

                    <span className={style.addPhotoURlBtn} onClick={onAddNewPhotoClick}/></div>}
            </div>

            <div className={style.profileInfo}>
                <EditableSpan title={name} updateTitle={onUpdateTitle}/>

                <div className={style.info}>
                    <span><b>Email</b>: {email}</span>
                    <span><b>Count of cards</b>: {publicCardPacksCount}</span>
                </div>

            </div>
        </div>
    )
}

export default withRedirect(Profile)


