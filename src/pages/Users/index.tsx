import { useSearchParams } from 'react-router-dom';

import style from './Users.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types';
import { Pagination, Preloader, SkeletonUserListItem, UserListItem } from 'components';
import { PAGE_COUNT } from 'constants/table';
import { useGetUsersQuery } from 'dal/users';
import { generateArray } from 'utils';

const SKELETON_LIST_ITEMS = generateArray(7);

const Users = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();

  const userName = searchParams.get('userName');
  const page = Number(searchParams.get('pageusers')) || 1;
  const min = Number(searchParams.get('userMin')) || 0;
  const max = Number(searchParams.get('userMax')) || 0;
  const sortUsers = searchParams.get('sortUsers') || '0created';

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
    pageCount: PAGE_COUNT,
  });

  return (
    <div className={style.usersPage}>
      <h2 className={style.title}>Users</h2>
      <div className={style.usersContainer}>
        {isUsersSuccess &&
          usersData &&
          usersData.users.map(
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
        {isUsersLoading &&
          SKELETON_LIST_ITEMS.map(item => {
            return <SkeletonUserListItem key={item} />;
          })}
      </div>
      <Pagination totalItemCount={usersData?.usersTotalCount} currentPage={page} />
    </div>
  );
};

export default Users;
