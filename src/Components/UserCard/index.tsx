import { FC, memo } from 'react';

import style from './UserCard.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type UserCardPropsType = {
  userName: string;
  userMail: string;
  cardsCount: number;
  avatar: string;
};

export const UserCard: FC<UserCardPropsType> = memo(
  ({
    userName,
    userMail,
    cardsCount,
    avatar,
  }: UserCardPropsType): ReturnComponentType => {
    return (
      <div className={style.userBlock}>
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
