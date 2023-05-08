import { FC, memo } from 'react';

import style from './UserCard.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types';

type UserListItemPropsType = {
  userName: string;
  userMail: string;
  cardsCount: number;
  avatar: string;
  onUserCardClick: () => void;
};

export const UserListItem: FC<UserListItemPropsType> = memo(
  ({
    userName,
    userMail,
    cardsCount,
    avatar,
    onUserCardClick,
  }: UserListItemPropsType): ReturnComponentType => {
    return (
      <div className={style.userBlock} onClick={onUserCardClick}>
        <img
          className={style.avatarContainer}
          src={avatar}
          alt="User Avatar"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = initialAvatar;
          }}
        />
        <div className={style.userDescription}>
          <h3 className={style.userTitle}>{userName}</h3>
          <span className={style.userSubTitle}>{userMail}</span>
          <div className={style.userInfo}>
            <span>Cards count: </span>
            <span>{cardsCount}</span>
          </div>
        </div>
      </div>
    );
  },
);
