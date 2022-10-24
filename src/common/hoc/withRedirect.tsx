import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../enums/Path';

export function withRedirect<T>(Component: ComponentType<T>) {
  let RedirectComponent = (props: T) => {
    let isLoggedIn = useSelector<AppRootStateType, boolean>(
      (state) => state.login.isLoggedIn
    );

    if (!isLoggedIn) {
      return <Navigate to={PATH.LOGIN} />;
    }
    return <Component {...props} />;
  };
  return RedirectComponent;
}
