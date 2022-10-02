import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../../store/store';
import { withRedirect } from 'common/hoc/withRedirect';
import style from './Profile.module.scss';
import { EditableSpan } from '../../Components/EditableSpan/EditableSpan';
import { updateProfileTC } from '../../store/thunks/profile';
import { InputTypeFile } from 'Components/InputTypeFile/InputTypeFile';

const Profile = () => {
  const dispatch = useDispatch();

  const avatar = useSelector<RootReducerType, string>(
    (state) => state.profile.avatar
  );
  const email = useSelector<RootReducerType, string>(
    (state) => state.profile.email
  );
  const name = useSelector<RootReducerType, string>(
    (state) => state.profile.name
  );
  const publicCardPacksCount = useSelector<RootReducerType, number>(
    (state) => state.profile.publicCardPacksCount
  );

  const onUpdateTitle = useCallback(
    (newTitle: string) => {
      if (newTitle !== name) {
        dispatch(updateProfileTC(newTitle, avatar));
      }
    },
    [dispatch, avatar, name]
  );
  const onUpdateAvatar = useCallback(
    (newAvatar: string) => {
      if (newAvatar !== avatar) {
        dispatch(updateProfileTC(name, newAvatar));
      }
    },
    [avatar, dispatch, name]
  );

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

export default withRedirect(Profile);
