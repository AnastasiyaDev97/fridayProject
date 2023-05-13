import { Suspense, useEffect, useState } from 'react';

import { socket } from 'common/config/socket';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { ErrorBoundary, Layout } from 'components';
import { Preloader } from 'components/Preloader';
import { STATUS } from 'constants/app';
import { useAuthMutation } from 'dal/authorization';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import {
  setAppStatus,
  setIsInitialized,
  setLoginStatus,
  setProfileData,
} from 'store/reducers';

const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [isConnected, setIsConnected] = useState(socket.connected);

  const [auth, { data: authData, isError: authError }] = useAuthMutation();

  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    dispatch(setAppStatus({ status: STATUS.LOADING }));
    auth();
  }, [auth, isInitialized, dispatch]);

  useEffect(() => {
    if (authData) {
      dispatch(setAppStatus({ status: STATUS.SUCCEEDED }));
      dispatch(setProfileData(authData));
      dispatch(setLoginStatus(true));
      dispatch(setIsInitialized(true));
    }
    if (authError) {
      dispatch(setIsInitialized(true));
      dispatch(setAppStatus({ status: STATUS.FAILED }));
    }
  }, [authData, dispatch, authError]);

  if (!isInitialized) {
    return <Layout />;
  }

  return (
    <Suspense fallback={<Preloader />}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
