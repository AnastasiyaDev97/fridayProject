import { FC, memo, useEffect, useCallback } from 'react';
import { UserCard } from 'Components/UserCard/UserCard';
import { getUsersTC } from 'store/thunks/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from 'store/store';
import { UserType } from 'dal/users/types/index';
import Preloader from 'Components/Preloader/Preloader';
import { Nullable } from 'types/Nullable';
import style from './Users.module.scss';
import initialAvatar from 'common/assets/images/noavatar.png';
import Pagination from 'Components/Pagination/Pagination';
import { changePageUsersAC } from 'store/reducers/users-reducer';
import { PORTION_SIZE } from 'constants/index';

type UsersPropsType = {};

export const Users: FC<UsersPropsType> = memo(() => {
  const dispatch = useDispatch();

  const users = useSelector<RootReducerType, Nullable<UserType[]>>(
    (state) => state.users.users
  );

  const totalItemCount = useSelector<RootReducerType, Nullable<number>>(
    (state) => state.users.usersTotalCount
  );
  const pageCount = useSelector<RootReducerType, Nullable<number>>(
    (state) => state.users.pageCount
  );
  const currentPage = useSelector<RootReducerType, Nullable<number>>(
    (state) => state.users.page
  );

  const handleChangePageClick = useCallback(
    (page: number) => {
      dispatch(changePageUsersAC(page));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getUsersTC());
  }, [dispatch]);

  if (!users) {
    return <Preloader />;
  }
  return (
    <div className={style.usersPage}>
      <h2>Users</h2>
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
