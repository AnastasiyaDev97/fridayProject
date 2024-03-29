import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import style from './Users.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types';
import { SkeletonUserListItem, UserListItem, InfiniteScroll } from 'components';
import { STATUS } from 'constants/app';
import { PAGE_COUNT } from 'constants/table';
import { useLazyGetUsersQuery } from 'dal/users';
import { UserType } from 'dal/users/types';
import { useAppDispatch, useAppSelector } from 'store';
import { setAppStatus } from 'store/reducers';
import { generateArray } from 'utils';

const SKELETON_LIST_ITEMS = generateArray(7);

const Users = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const status = useAppSelector(state => state.app.status);

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const userName = searchParams.get('name');
  const min = Number(searchParams.get('min')) || 0;
  const max = Number(searchParams.get('max')) || 0;
  const sortUsers = searchParams.get('sort') || '0created';
  const [fetchUsers] = useLazyGetUsersQuery();

  const loadMoreNumbers = async (): Promise<void> => {
    setPage(page => page + 1);
    setLoading(true);
    dispatch(setAppStatus({ status: STATUS.LOADING }));
    const newUsers = await fetchUsers({
      page,
      min,
      max,
      userName,
      sortUsers,
      pageCount: PAGE_COUNT,
    });

    if (newUsers?.data?.users) {
      setUsers(users => [...users, ...(newUsers?.data?.users as UserType[])]);
    }
    if (totalCount === 0 && newUsers?.data) {
      setTotalCount(newUsers.data.usersTotalCount);
    }
    dispatch(setAppStatus({ status: STATUS.SUCCEEDED }));
    setLoading(false);
  };

  const hasMoreData = users.length < totalCount;

  return (
    <div className={style.usersPage}>
      <h2 className={style.title}>Users</h2>
      <div className={style.usersContainer}>
        <InfiniteScroll
          hasMoreData={hasMoreData}
          isLoading={loading}
          onBottomHit={loadMoreNumbers}
          loadOnMount={true}
        >
          {users?.map(({ avatar, email, name, publicCardPacksCount, _id: id }) => {
            return (
              <UserListItem
                userName={name}
                userMail={email}
                cardsCount={publicCardPacksCount}
                avatar={avatar ?? initialAvatar}
                key={id}
              />
            );
          })}
        </InfiniteScroll>
        {(users?.length === 0 || status === STATUS.LOADING) &&
          SKELETON_LIST_ITEMS.map(item => {
            return <SkeletonUserListItem key={item} />;
          })}
      </div>
    </div>
  );
};

export default Users;
