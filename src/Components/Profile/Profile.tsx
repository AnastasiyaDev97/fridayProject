import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {withRedirect} from "../../common/hoc/withRedirect";
import s from './Profile.module.scss'
import SuperInputText from "../TestComponents/components/c1-SuperInputText/SuperInputText";
import {updatePackTC} from "../../store/reducers/profile-reducer";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";


const Profile = () => {
    const dispatch = useDispatch()
    console.log('profile')
    const avatar = useSelector<RootReducerType, string>(state => state.profile.avatar)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const name = useSelector<RootReducerType, string>(state => state.profile.name)
    const publicCardPacksCount = useSelector<RootReducerType, number>(state => state.profile.publicCardPacksCount)

    const [avatarURL, setAvatarURL] = useState<string>('')
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
        setAvatarURL('')
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
        <div className={s.profileWrapper}>
            <div className={s.avatarBlock}>
                <div className={s.avatarWrapper}>
                    <div className={s.tooltip} onClick={onChangePhotoClick}>Change Photo</div>
                    <img alt='avatar' className={s.avatar} src={avatar}/>
                </div>

                {isInputActive &&
                <div className={s.inputForURL}><SuperInputText className={s.input} value={avatarURL}
                                                               onChange={onInputForURLChange}
                                                               onKeyPress={onInputForURLKeyPress}
                                                               autoFocus placeholder={'Add URL'}/>
                    <span className={s.addPhotoURlBtn} onClick={onAddNewPhotoClick}></span></div>}

            </div>
            <div className={s.profileInfo}>
                <EditableSpan title={name} updateTitle={onUpdateTitle}/>
                <div className={s.info}>
                    <span><b>Email</b>: {email}</span>
                    <span><b>Count of cards</b>: {publicCardPacksCount}</span>
                </div>
            </div>

        </div>
    )
}

export default withRedirect(Profile)


