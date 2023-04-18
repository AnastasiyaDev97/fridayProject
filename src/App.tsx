import { Suspense, useEffect } from 'react';

/* import { Navigate } from 'react-router-dom'; */

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Preloader } from 'components/Preloader';
import { useAuthMutation } from 'dal/authorization';
/* import Login from 'pages/Login'; */
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { setErrorText, setIsInitialized } from 'store/reducers/app';
import { setLoginStatus } from 'store/reducers/auth';
import { setProfileData } from 'store/reducers/profile';

const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [auth, { data: authData, isError: authError /* , isError, isSuccess */ }] =
    useAuthMutation();

  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    auth();
  }, []);

  useEffect(() => {
    if (authData) {
      dispatch(setProfileData(authData));
      dispatch(setLoginStatus(true));
      dispatch(setIsInitialized(true));
    }
    if (authError) {
      dispatch(setErrorText({ errorText: 'You are not authorized' }));
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
