import { useCallback, useEffect, useMemo } from 'react';

import style from './Profile.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { useResponseHandler } from 'common/hooks/useResponseHandler';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { EditableSpan, FileInput, ProfileCard } from 'components';
import { useUpdateProfileMutation } from 'dal/profile';
import { useAppDispatch, useAppSelector } from 'store';
import { setProfileData } from 'store/reducers';

const Profile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [updateProfile, { data: updatedProfileData, isError, isLoading, isSuccess }] =
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
  }, [updatedProfileData, dispatch]);

  useResponseHandler({
    isLoading,
    isSuccess,
    isError,
  });

  if (profileData) {
    return (
      <div className={style.wrapper}>
        <h2 className={style.title}>Profile Page</h2>
        <ProfileCard
          profileData={profileData}
          nameChildren={<EditableSpan title={name} updateTitle={onUpdateTitle} />}
          avatarChildren={
            <FileInput updateImage={onUpdateAvatar} image={avatar || initialAvatar} />
          }
        />
      </div>
    );
  }

  return null;
};

export default Profile;
