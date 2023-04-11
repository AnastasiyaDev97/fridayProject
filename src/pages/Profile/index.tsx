import { useCallback, useEffect } from 'react';

import style from './Profile.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { InputTypeFile } from 'components/InputTypeFile';
import { useUpdateProfileMutation } from 'dal/profile';
import { useAppDispatch, useAppSelector } from 'store';
import { setProfileData } from 'store/reducers/profile';

export const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [updateProfile, { data: profileData /* , error: profileError */ }] =
    useUpdateProfileMutation();

  const avatar = useAppSelector(state => state.profile.avatar);
  const email = useAppSelector(state => state.profile.email);
  const name = useAppSelector(state => state.profile.name);
  const publicCardPacksCount = useAppSelector(
    state => state.profile.publicCardPacksCount,
  );

  const onUpdateTitle = useCallback(
    (newTitle: string) => {
      if (newTitle !== name) {
        updateProfile({ name: newTitle, avatar });
      }
    },
    [avatar, name, updateProfile],
  );
  const onUpdateAvatar = useCallback(
    (newAvatar: string) => {
      if (newAvatar !== avatar) {
        updateProfile({ name, avatar: newAvatar });
      }
    },
    [avatar, name, updateProfile],
  );

  useEffect(() => {
    if (profileData) {
      dispatch(setProfileData(profileData.updatedUser));
    }
  }, [profileData, dispatch]);

  return (
    <div className={style.profileWrapper}>
      <div className={style.avatarBlock}>
        <InputTypeFile onUpdateAvatar={onUpdateAvatar} avatar={avatar} />
      </div>

      <div className={style.profileInfo}>
        <EditableSpan title={name} updateTitle={onUpdateTitle} />

        <div className={style.info}>
          <span>
            <b>Email</b>: {email}
          </span>
          <span>
            <b>Count of cards</b>: {publicCardPacksCount}
          </span>
        </div>
      </div>
    </div>
  );
};
