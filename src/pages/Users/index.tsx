import { useEffect /* , useCallback  */ } from 'react';

import { useSearchParams } from 'react-router-dom';

import style from './Users.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types';
import { Preloader, UserListItem } from 'components';
import { useGetUsersQuery } from 'dal/users';
import { useAppDispatch /* , useAppSelector */ } from 'store';
/* import { changePageUsersAC } from 'store/reducers/users'; */
/* import initialAvatar from 'common/assets/images/noavatar.png';
import { Pagination } from 'components/Pagination';
import { Preloader } from 'components/Preloader';
import { UserCard } from 'components/UserCard';
import { PORTION_SIZE } from 'constants/index'; */
const Users = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const userName = searchParams.get('userName');
  const page = Number(searchParams.get('userPage')) || 1;
  const min = Number(searchParams.get('userMin')) || 0;
  const max = Number(searchParams.get('userMax')) || 0;
  const sortUsers = searchParams.get('sortUsers') || '0updated';

  const {
    data: usersData,
    isSuccess: isUsersSuccess,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery({
    page,
    min,
    max,
    userName,
    sortUsers,
  });

  /*   const users = useAppSelector(state => state.users.users);

  const totalItemCount = useAppSelector(state => state.users.usersTotalCount);

  const pageCount = useAppSelector(state => state.users.pageCount);
  const currentPage = useAppSelector(state => state.users.page);
  const handleChangePageClick = useCallback(
    (page: number) => {
      dispatch(changePageUsersAC(page));
    },
    [dispatch],
  );
 */
  useEffect(() => {
    /* dispatch(getUsersTC()); */
  }, [dispatch]);

  if (isUsersLoading) {
    return <Preloader />;
  }
  if (isUsersSuccess && usersData) {
    return (
      <div className={style.usersPage}>
        <h2 className={style.title}>Users</h2>
        <div className={style.usersContainer}>
          {usersData.users.map(
            ({ avatar, email, name, publicCardPacksCount, _id: id }) => {
              return (
                <UserListItem
                  userName={name}
                  userMail={email}
                  cardsCount={publicCardPacksCount}
                  avatar={avatar ?? initialAvatar}
                  key={id}
                />
              );
            },
          )}
        </div>
        {/*  <Pagination
        totalItemCount={totalItemCount}
        pageCount={pageCount}
        currentPage={currentPage}
        onChangePageClick={handleChangePageClick}
        portionSize={PORTION_SIZE}
      /> */}
      </div>
    );
  }

  return null;
};

export default Users;
