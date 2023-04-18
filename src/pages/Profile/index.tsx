import { useCallback, useEffect } from 'react';

import style from './Profile.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { EditableSpan } from 'components/EditableSpan';
import { FileInput } from 'components/FileInput';
import { useUpdateProfileMutation } from 'dal/profile';
import { useAppDispatch, useAppSelector } from 'store';
import { setErrorText } from 'store/reducers/app';
import { setProfileData } from 'store/reducers/profile';

const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [updateProfile, { data: profileData, isError: isProfileError }] =
    useUpdateProfileMutation();

  const email = useAppSelector(state => state.profile.email);
  const avatar = useAppSelector(state => state.profile.avatar);
  const name = useAppSelector(state => state.profile.name);
  const publicCardPacksCount = useAppSelector(
    state => state.profile.publicCardPacksCount,
  );

  const onUpdateAvatar = (newAvatar: string): void => {
    if (newAvatar !== avatar) {
      updateProfile({ avatar: newAvatar });
    }
  };

  const onUpdateTitle = useCallback(
    (newTitle: string) => {
      if (newTitle !== name) {
        updateProfile({ name: newTitle });
      }
    },
    [name, updateProfile],
  );

  useEffect(() => {
    if (profileData) {
      dispatch(setProfileData(profileData.updatedUser));
    }
    if (isProfileError) {
      dispatch(setErrorText({ errorText: 'Profile failed to update' }));
    }
  }, [profileData, dispatch, isProfileError]);

  return (
    <div className={style.profileWrapper}>
      <div className={style.avatarBlock}>
        <FileInput updateImage={onUpdateAvatar} image={avatar} />
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

export default Profile;
