import Skeleton from '@mui/material/Skeleton';

import style from './UserCard.module.scss';

import { ReturnComponentType } from 'common/types';

export const SkeletonUserListItem = (): ReturnComponentType => {
  return (
    <div className={style.userBlock}>
      <Skeleton variant="circular" width={100} height={100} className={style.skeleton} />
      <div className={style.userDescription}>
        <Skeleton className={style.skeleton} />
        <Skeleton className={style.skeleton} />

        <div className={style.userInfo}>
          <span>Cards count: </span>
          <Skeleton className={style.skeleton} />
        </div>
      </div>
    </div>
  );
};
