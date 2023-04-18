import { Navigate, useLocation } from 'react-router-dom';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { PATH } from 'enums/Path';
import { useAppSelector } from 'store';

export const RequireAuth = ({ children }: any): ReturnComponentType => {
  const location = useLocation;
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} />;
  }

  return children;
};
