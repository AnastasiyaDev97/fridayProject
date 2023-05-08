import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ReturnComponentType } from 'common/types';
import { ProfileCard } from 'components';
import { useGetUserQuery } from 'dal/users';
import { useAppDispatch } from 'store';
import { setErrorText } from 'store/reducers';

const UserProfile = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const params = useParams<'id'>();
  const id = params.id;

  const {
    data: userData,
    isSuccess: isUserSuccess,
    /* isLoading: isPacksLoading, */
    isError: isUserError,
  } = useGetUserQuery({
    id,
  });

  useEffect(() => {
    if (isUserError) {
      dispatch(setErrorText({ errorText: 'User profile failed to loaded' }));
    }
  }, [isUserError, dispatch]);

  if (isUserSuccess) {
    return (
      <ProfileCard
        profileData={userData.user}
        nameChildren={<span>{userData.user.name}</span>}
        avatarChildren={<img src={userData.user.avatar} alt="user avatar" />}
      />
    );
  }

  return null;
};

export default UserProfile;
