import { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../../store/store';
import { withRedirect } from 'common/hoc/withRedirect';
import style from './Profile.module.scss';
import SuperInputText from '../../Components/TestComponents/components/c1-SuperInputText/SuperInputText';
import { EditableSpan } from '../../Components/EditableSpan/EditableSpan';
import { EMPTY_STRING } from '../../constants';
import { updateProfileTC } from '../../store/thunks/profile';

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

  const [avatarURL, setAvatarURL] = useState<string>(EMPTY_STRING);
  const [isInputActive, setIsInputActive] = useState<boolean>(false);

  const onActivateInputForURLClick = () => {
    setIsInputActive(true);
  };

  const onInputForURLChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAvatarURL(e.currentTarget.value);
    },
    []
  );

  const onAddNewPhotoClick = () => {
    dispatch(updateProfileTC(name, avatarURL));
    setIsInputActive(false);
    setAvatarURL(EMPTY_STRING);
  };

  const onInputForURLKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddNewPhotoClick();
    }
  };

  const onUpdateTitle = (newTitle: string) => {
    if (newTitle !== name) {
      dispatch(updateProfileTC(newTitle));
    }
  };

  const onCloseInputBlur = useCallback(() => {
    setIsInputActive(false);
  }, [setIsInputActive]);

  return (
    <div className={style.profileWrapper}>
      <div className={style.avatarBlock}>
        <div className={style.avatarWrapper}>
          <div className={style.tooltip} onClick={onActivateInputForURLClick}>
            Change Photo
          </div>
          <img alt="avatar" className={style.avatar} src={avatar} />
        </div>

        {isInputActive && (
          <div className={style.inputForURL} onBlur={onCloseInputBlur}>
            <SuperInputText
              className={style.input}
              value={avatarURL}
              onChange={onInputForURLChange}
              onKeyPress={onInputForURLKeyPress}
              autoFocus
              placeholder={'Add URL'}
            />

            {/*  <span className={style.addPhotoURlBtn} onClick={onAddNewPhotoClick}/> */}
          </div>
        )}
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
