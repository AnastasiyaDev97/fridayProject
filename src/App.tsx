import React, {useCallback, useEffect} from 'react';
import {Login} from "./Components/Authorization/Login/Login";
import {Registration} from "./Components/Authorization/Redistration/Registration";
import {NotFound} from "./Components/NotFound/NotFound";
import {ForgotPassword} from "./Components/Authorization/ForgotPassword/ForgotPassword";
import {NewPassword} from "./Components/Authorization/NewPassword/NewPassword";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "./Components/Header/Header";
import styles from './App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import Preloader from "./common/Preloader/Preloader";
import {Cards} from "./Components/Cards/Cards";
import {setModalPropsAC, setModalTypeAC} from "./store/reducers/modal-reducer";
import {modalActionType, modalEntityType} from "./common/components/Modal/ModalContainer/ModalContainer";
import Profile from "./Components/Profile/Profile";
import Packs from "./Components/Packs/Packs";
import {initializeAppTC} from "./store/thunks/app";
import {Nullable} from "./types/Nullable";
import {STATUS} from "./enum/StatusType";
import {PATH} from "./enum/Path";
import {MODAL_ENTITY} from "./enum/ModalEntity";


function App() {
    const dispatch = useDispatch()

    const status = useSelector<RootReducerType, string>(state => state.app.status)
    const isInitialized = useSelector<RootReducerType, boolean>(state => state.app.isInitialized)
    const error = useSelector<RootReducerType, Nullable<string>>(state => state.app.error)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const setModalData = useCallback((modalAction: modalActionType, modalEntity: modalEntityType, id: string) => {
        dispatch(setModalPropsAC(id))
        dispatch(setModalTypeAC(modalAction, modalEntity))
    }, [dispatch])

    const setModalDataCards = useCallback((modalAction: modalActionType, id: string) => {
        setModalData(modalAction, MODAL_ENTITY.CARD, id)
    }, [setModalData])

    const setModalDataPacks = useCallback((modalAction: modalActionType, id: string) => {
        setModalData(modalAction, MODAL_ENTITY.PACK, id)
    }, [setModalData])


    return (

        <div className={styles.appWrapper}>
            <Header/>

            <div className={styles.mainBlock}>
                {status === STATUS.LOADING && <Preloader/>}

                {!isInitialized ? <></>
                    :
                    <Routes>
                        <Route path={PATH.START} element={<Navigate to={PATH.PROFILE}/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                        <Route path={PATH.NOT_FOUND} element={<NotFound/>}/>
                        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                        <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}>
                            <Route path=":token" element={<NewPassword/>}/>
                        </Route>
                        <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
                        <Route path={PATH.CARDS} element={<Cards setModalData={setModalDataCards}/>}>
                            <Route path=":id" element={<Cards setModalData={setModalDataCards}/>}/>
                        </Route>
                        <Route path={PATH.PACKS} element={<Packs setModalData={setModalDataPacks}/>}/>
                        <Route path={PATH.LOGIN} element={<Login/>}/>

                    </Routes>
                }
            </div>
            <div className={styles.err}>{error}</div>
        </div>
    )
}


export default App;

