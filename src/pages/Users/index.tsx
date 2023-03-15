import { useEffect /* , useCallback  */ } from 'react';

/* import { getUsersTC } from 'store/thunks/users'; */

import style from './Users.module.scss';

/* import initialAvatar from 'common/assets/images/noavatar.png';
import { Pagination } from 'components/Pagination';
import { Preloader } from 'components/Preloader';
import { UserCard } from 'components/UserCard';
import { PORTION_SIZE } from 'constants/index'; */
import { useAppDispatch /* , useAppSelector */ } from 'store';
/* import { changePageUsersAC } from 'store/reducers/users'; */
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export const Users = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

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

  /*  if (!users) {
    return <Preloader />;
  } */

  return (
    <div className={style.usersPage}>
      <h2 className={style.title}>Users</h2>
      <div className={style.usersContainer}>
        {/*    {users.map(({ avatar, email, name, publicCardPacksCount, _id }) => {
          return (
            <UserCard
              userName={name}
              userMail={email}
              cardsCount={publicCardPacksCount}
              avatar={avatar ?? initialAvatar}
              key={_id}
            />
          );
        })} */}
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
};

