import React from 'react';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {ResponseLoginType} from "../../dal/authorization/types";
import {withRedirect} from "../../common/hoc/withRedirect";
import s from './Profile.module.scss'



 const Profile=()=>{
    console.log('profile')
    const profile=useSelector<RootReducerType, ResponseLoginType>(state=>state.profile)

    return(
        <div className={s.profileWrapper}>
            <div className={s.avatarBlock}>
                <img alt='avatar' className={s.avatar}/>
                <input type={'file'} className={s.inputNone}/>
                <button className={s.addPhotoBtn}>Add photo</button>
            </div>
            <div className={s.profileInfo}>
                <span>name</span>
                <span>{profile.email}</span>
                <span></span>
            </div>

        </div>
    )
}

export default withRedirect(Profile)