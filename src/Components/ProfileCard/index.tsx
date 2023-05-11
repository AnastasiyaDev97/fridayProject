import { ReactNode } from 'react';

import style from './ProfileCard.module.scss';

import { ReturnComponentType } from 'common/types';
import { UserType } from 'dal/users/types';

type ProfileCardPropsData = {
  profileData: UserType;
  avatarChildren: ReactNode;
  nameChildren: ReactNode;
};

export const ProfileCard = ({
  profileData,
  nameChildren,
  avatarChildren,
}: ProfileCardPropsData): ReturnComponentType => {
  const { email, publicCardPacksCount } = profileData;

  return (
    <div className={style.profileWrapper}>
      {avatarChildren && <div className={style.avatarBlock}>{avatarChildren}</div>}

      <div className={style.profileInfo}>
        {nameChildren}

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
