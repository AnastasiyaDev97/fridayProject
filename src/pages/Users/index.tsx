import { useCallback, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import style from './Users.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types';
import { Pagination, SkeletonUserListItem, UserListItem } from 'components';
import { PAGE_COUNT } from 'constants/table';
import { useGetUsersQuery, useLazyGetUsersQuery } from 'dal/users';
/* import useInifiniteScroll from 'hooks/useInfiniteScroll'; */
import { generateArray } from 'utils';

const SKELETON_LIST_ITEMS = generateArray(7);

const Users = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();

  const userName = searchParams.get('name');
  const page = Number(searchParams.get('page')) || 1;
  const min = Number(searchParams.get('min')) || 0;
  const max = Number(searchParams.get('max')) || 0;
  const sortUsers = searchParams.get('sort') || '0created';

  const {
    data: usersData,
    isSuccess: isSuccess,
    isLoading: isLoading,
    isError: isError,
    refetch: refetchUsers,
  } = useGetUsersQuery({
    page,
    min,
    max,
    userName,
    sortUsers,
    pageCount: PAGE_COUNT,
  });

  useEffect(() => {
    if (isError) {
      refetchUsers();
    }
  }, [isError, refetchUsers]);

  /*   const baseQueryAttributes = {
    userName,
    min,
    max,
    sortUsers,
    pageCount: PAGE_COUNT,
  };
 */
  /*  useInifiniteScroll({
    data: [],
    fetch: () => {
      console.log(1);
    },
    searchParams: { min: '1', page: '2' },
  }); */
  /*  const [fetchUsers, { data: usersData, isLoading: isLoading, isError, isSuccess }] =
    useLazyGetUsersQuery();

  const fetchCallback = useCallback(fetchUsers, [fetchUsers]); */

  /*   const {
    data: usersData,
    isSuccess: isSuccess,
    isLoading: isLoading,
    isError: isError,
    refetch: refetchUsers,
  } = useLazyGetUsersQuery({
    page,
    min,
    max,
    userName,
    sortUsers,
    pageCount: PAGE_COUNT,
  }); */
  /* 
  const { */
  /* source, */
  /* includedSource,
    dataLength,
    next,
    hasMore,
    resetList,
    forceOnLoadMore, */
  /*  } = useInifiniteScroll({
    data: usersData?.users,
    searchParams: {
      ...baseQueryAttributes,
    },
    skip: isLoading,
    fetch: fetchCallback,
  }); */

  return (
    <div className={style.usersPage}>
      <h2 className={style.title}>Users</h2>
      <div className={style.usersContainer}>
        {isSuccess &&
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
        {isLoading &&
          SKELETON_LIST_ITEMS.map(item => {
            return <SkeletonUserListItem key={item} />;
          })}
      </div>
      <Pagination totalItemCount={usersData?.usersTotalCount} currentPage={page} />
    </div>
  );
};

export default Users;
