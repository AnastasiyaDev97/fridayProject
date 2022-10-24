import { FC, memo, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import style from './Users.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { Pagination } from 'components/Pagination';
import { Preloader } from 'components/Preloader';
import { UserCard } from 'components/UserCard';
import { PORTION_SIZE } from 'constants/index';
import { UserType } from 'dal/users/types/index';
import { changePageUsersAC } from 'store/reducers/users-reducer';
import { AppRootStateType } from 'store/store';
import { getUsersTC } from 'store/thunks/users';
import { Nullable } from 'types/Nullable';

type UsersPropsType = {};

const Users: FC<UsersPropsType> = memo(() => {
  const dispatch = useDispatch();

  const users = useSelector<AppRootStateType, Nullable<UserType[]>>(
    state => state.users.users,
  );

  const totalItemCount = useSelector<AppRootStateType, Nullable<number>>(
    state => state.users.usersTotalCount,
  );

  const pageCount = useSelector<AppRootStateType, Nullable<number>>(
    state => state.users.pageCount,
  );
  const currentPage = useSelector<AppRootStateType, Nullable<number>>(
    state => state.users.page,
  );
  const handleChangePageClick = useCallback(
    (page: number) => {
      dispatch(changePageUsersAC(page));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getUsersTC());
  }, [dispatch]);

  if (!users) {
    return <Preloader />;
  }

  return (
    <div className={style.usersPage}>
      <h2 className={style.title}>Users</h2>
      <div className={style.usersContainer}>
        {users.map(({ avatar, email, name, publicCardPacksCount, _id }) => {
          return (
            <UserCard
              userName={name}
              userMail={email}
              cardsCount={publicCardPacksCount}
              avatar={avatar ?? initialAvatar}
              key={_id}
            />
          );
        })}
      </div>
      <Pagination
        totalItemCount={totalItemCount}
        pageCount={pageCount}
        currentPage={currentPage}
        onChangePageClick={handleChangePageClick}
        portionSize={PORTION_SIZE}
      />
    </div>
  );
});

export default Users;
