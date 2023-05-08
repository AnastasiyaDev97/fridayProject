import { useSearchParams } from 'react-router-dom';

import style from './Users.module.scss';

import initialAvatar from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types';
import { Pagination, Preloader, UserListItem } from 'components';
import { PAGE_COUNT } from 'constants/table';
import { useGetUsersQuery } from 'dal/users';

const Users = (): ReturnComponentType => {
  const [searchParams] = useSearchParams();

  const userName = searchParams.get('userName');
  const page = Number(searchParams.get('pageusers')) || 1;
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
    pageCount: PAGE_COUNT,
  });

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
        <Pagination
          totalItemCount={usersData.usersTotalCount}
          currentPage={page}
          itemName="users"
        />
      </div>
    );
  }

  return null;
};

export default Users;
