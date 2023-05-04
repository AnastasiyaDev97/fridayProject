import { Suspense, useEffect } from 'react';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Preloader } from 'components/Preloader';
import { useAuthMutation } from 'dal/authorization';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { setIsInitialized, setLoginStatus, setProfileData } from 'store/reducers';

const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [auth, { data: authData, isError: authError }] = useAuthMutation();

  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    auth();
  }, [auth, isInitialized]);

  useEffect(() => {
    if (authData) {
      dispatch(setProfileData(authData));
      dispatch(setLoginStatus(true));
      dispatch(setIsInitialized(true));
    }
    if (authError) {
      dispatch(setIsInitialized(true));
    }
  }, [authData, dispatch, authError]);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <Suspense fallback={<Preloader />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
