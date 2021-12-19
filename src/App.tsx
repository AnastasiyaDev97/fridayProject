import React, {useEffect} from 'react';
import './App.module.css';
import {Login} from "./Components/Login/Login";
import {Profile} from "./Components/Profile/Profile";
import {Registration} from "./Components/Redistration/Registration";
import {NotFound} from "./Components/NotFound/NotFound";
import {ForgotPassword} from "./Components/ForgotPassword/ForgotPassword";
import {NewPassword} from "./Components/NewPassword/NewPassword";
import {TestComponents} from "./Components/TestComponents/TestComponents";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "./Components/Header/Header";
import styles from './App.module.css'
import {initializeAppTC, RequestStatusType} from "./store/reducers/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import Preloader from "./common/Preloader/Preloader";


function App() {
    let status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<RootReducerType, boolean>(state => state.app.isInitialized)
    const error = useSelector<RootReducerType, null | string>(state => state.app.error)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])



   

    return (
        <div className={styles.appWrapper}>
            <Header/>
                <div className={styles.mainBlock}>
                    {!isInitialized||status === 'loading' ? <Preloader/> :
                    <Routes>
                        <Route path={'/'} element={<Profile/>}/>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<NotFound/>}/>
                        <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                        <Route path={'/new-password/*'} element={<NewPassword/>}/>
                        <Route path={'/test-components'} element={<TestComponents/>}/>
                        <Route path={'*'} element={<Navigate to='/404'/>}/>
                    </Routes>}
                </div>

           <div className={styles.err}>{error}</div>
        </div>
    );
}

export default App;
