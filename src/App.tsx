import { Suspense, useEffect } from 'react';

/* import { Navigate } from 'react-router-dom'; */

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Preloader } from 'components/Preloader';
import { useAuthMutation } from 'dal/authorization';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { setErrorText, setIsInitialized } from 'store/reducers/app';
import { setProfileData } from 'store/reducers/profile';

const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const [auth, { data: authData /* , isError, isSuccess */ }] = useAuthMutation();

  const isInitialized = useAppSelector(state => state.app.isInitialized);
  /*   const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn); */

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    const initializeApp = async (): Promise<void> => {
      try {
        await auth();
        if (authData) {
          dispatch(setProfileData(authData));
        }
      } catch (error) {
        dispatch(setErrorText({ errorText: 'You are not authorized' }));
      } finally {
        dispatch(setIsInitialized(true));
      }
    };

    initializeApp();
  }, [isInitialized, auth, dispatch, authData]);

  /*   useEffect(() => {
    if (authData) {
      dispatch(setProfileData(authData));
      dispatch(setIsInitialized(true));
    }
  }, [authData, dispatch]); */

  /*   useEffect(() => {
    if (isError) {
      dispatch(setErrorText({ errorText: 'You are not authorized' }));
    }
  }, [isError, dispatch]); */

  if (!isInitialized) {
    return <Preloader />;
  }
  /*   if (!isLoggedIn) {
    <Navigate to={LOGIN} />;
  } */

  return (
    <Suspense fallback={<Preloader />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
