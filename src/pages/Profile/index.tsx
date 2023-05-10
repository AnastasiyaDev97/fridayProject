import { useCallback, useEffect, useMemo } from 'react';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { EditableSpan, FileInput, ProfileCard } from 'components';
import { useUpdateProfileMutation } from 'dal/profile';
import { useAppDispatch, useAppSelector } from 'store';
import { setErrorText, setProfileData } from 'store/reducers';

const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [updateProfile, { data: updatedProfileData, isError: isProfileError }] =
    useUpdateProfileMutation();

  const email = useAppSelector(state => state.profile.email);
  const avatar = useAppSelector(state => state.profile.avatar);
  const name = useAppSelector(state => state.profile.name);
  const publicCardPacksCount = useAppSelector(
    state => state.profile.publicCardPacksCount,
  );

  const profileData = useMemo(
    () => ({ email, avatar, name, publicCardPacksCount }),
    [email, avatar, name, publicCardPacksCount],
  );

  const onUpdateAvatar = useCallback(
    (newAvatar: string): void => {
      if (newAvatar !== avatar) {
        updateProfile({ avatar: newAvatar });
      }
    },
    [updateProfile, avatar],
  );

  const onUpdateTitle = useCallback(
    (newTitle: string) => {
      if (newTitle !== name) {
        updateProfile({ name: newTitle });
      }
    },
    [updateProfile, name],
  );

  useEffect(() => {
    if (updatedProfileData) {
      dispatch(setProfileData(updatedProfileData.updatedUser));
    }
    if (isProfileError) {
      dispatch(setErrorText({ errorText: 'Profile failed to update' }));
    }
  }, [updatedProfileData, dispatch, isProfileError]);

  if (profileData) {
    return (
      <ProfileCard
        profileData={profileData}
        nameChildren={<EditableSpan title={name} updateTitle={onUpdateTitle} />}
        avatarChildren={<FileInput updateImage={onUpdateAvatar} image={avatar} />}
      />
    );
  }

  return null;
};

{
  /* <div className={style.profileWrapper}>
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
    </div> */
  /*  }

  return null; */
}

export default Profile;
