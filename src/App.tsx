import { Suspense, useEffect } from 'react';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { ErrorBoundary, Layout } from 'components';
import { useAuthMutation } from 'dal/authorization';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { setIsInitialized, setLoginStatus, setProfileData } from 'store/reducers';

const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [auth, { data: authData, isError }] = useAuthMutation();

  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    auth();
  }, [auth, isInitialized, dispatch]);

  useEffect(() => {
    if (authData) {
      dispatch(setProfileData(authData));
      dispatch(setLoginStatus(true));
      dispatch(setIsInitialized(true));
    }
    if (isError) {
      dispatch(setIsInitialized(true));
    }
  }, [authData, dispatch, isError]);

  if (!isInitialized) {
    return <Layout />;
  }

  return (
    <Suspense fallback={<Layout />}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
