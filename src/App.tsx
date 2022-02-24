import React, { useCallback, useEffect } from "react";
import { Registration } from "./Components/Authorization/Redistration/Registration";
import { NotFound } from "./Components/NotFound/NotFound";
import { ForgotPassword } from "./Components/Authorization/ForgotPassword/ForgotPassword";
import { NewPassword } from "./Components/Authorization/NewPassword/NewPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "./store/store";
import Preloader from "./common/Preloader/Preloader";
import { Cards } from "./Components/Cards/Cards";
import {
  setModalPropsAC,
  setModalTypeAC,
} from "./store/reducers/modal-reducer";
import { modalActionType, modalEntityType } from "./enum/Modals";
import Profile from "./Components/Profile/Profile";
import Packs from "./Components/Packs/Packs";
import { initializeAppTC } from "./store/thunks/app";
import { Nullable } from "./types/Nullable";
import { STATUS } from "./enum/StatusType";
import { PATH } from "./enum/Path";
import { Login } from "./Components/Authorization/Login/Login";
import { setErrorText } from "./store/reducers/app-reducer";

function App() {
  const dispatch = useDispatch();

  const status = useSelector<RootReducerType, string>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<RootReducerType, boolean>(
    (state) => state.app.isInitialized
  );
  const error = useSelector<RootReducerType, Nullable<string>>(
    (state) => state.app.error
  );

  const { Card, Pack } = modalEntityType;
  const {
    PROFILE,
    REGISTRATION,
    NOT_FOUND,
    FORGOT_PASSWORD,
    NEW_PASSWORD,
    CARDS,
    PACKS,
    LOGIN,
    START,
    TOKEN,
    ANY,
    ID,
  } = PATH;

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(setErrorText(null));
      }, 3000);
    }
  }, [error, dispatch]);

  const setModalData = useCallback(
    (
      modalAction: modalActionType,
      modalEntity: modalEntityType,
      id: string
    ) => {
      dispatch(setModalPropsAC(id));
      dispatch(setModalTypeAC(modalAction, modalEntity));
    },
    [dispatch]
  );

  const setModalDataCards = useCallback(
    (modalAction: modalActionType, id: string) => {
      setModalData(modalAction, Card, id);
    },
    [setModalData, Card]
  );

  const setModalDataPacks = useCallback(
    (modalAction: modalActionType, id: string) => {
      setModalData(modalAction, Pack, id);
    },
    [setModalData, Pack]
  );

  return (
    <div className={styles.appWrapper}>
      <Header />

      <div className={styles.mainBlock}>
        {status === STATUS.LOADING && <Preloader />}

        {!isInitialized ? (
          <></>
        ) : (
          <Routes>
            <Route path={START} element={<Navigate to={PROFILE} />} />
            <Route path={PROFILE} element={<Profile />} />
            <Route path={REGISTRATION} element={<Registration />} />
            <Route path={NOT_FOUND} element={<NotFound />} />
            <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={NEW_PASSWORD} element={<NewPassword />}>
              <Route path={TOKEN} element={<NewPassword />} />
            </Route>
            <Route path={ANY} element={<Navigate to={NOT_FOUND} />} />
            <Route
              path={CARDS}
              element={<Cards setModalData={setModalDataCards} />}
            >
              <Route
                path={ID}
                element={<Cards setModalData={setModalDataCards} />}
              />
            </Route>
            <Route
              path={PACKS}
              element={<Packs setModalData={setModalDataPacks} />}
            />
            <Route path={LOGIN} element={<Login />} />
          </Routes>
        )}
      </div>
      {error && <div className={styles.err}>{error}</div>}
    </div>
  );
}

export default App;
