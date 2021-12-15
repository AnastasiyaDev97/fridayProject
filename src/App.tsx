import React, {useEffect} from 'react';
import './App.module.css';
import {Login} from "./Components/Login/Login";
import {Profile} from "./Components/Profile/Profile";
import {Registration} from "./Components/Redistration/Registration";
import {NotFound} from "./Components/NotFound/NotFound";
import {PasswordRecovery} from "./Components/PasswordRecovery/PasswordRecovery";
import {NewPassword} from "./Components/NewPassword/NewPassword";
import {TestComponents} from "./Components/TestComponents/TestComponents";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "./Components/Header/Header";
import styles from './App.module.css'
import {initializeAppTC} from "./store/reducers/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import Preloader from "./common/Preloader/Preloader";


function App() {
    const isInitialized=useSelector<RootReducerType,boolean>(state=>state.app.isInitialized)

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    if (!isInitialized) {
        return (
            <Preloader/>
        )
    }
        return (
        <div className={styles.appWrapper}>

                <Header/>
            {!isInitialized ? <Preloader/> :
                <div className={styles.mainBlock}>

                <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/404'} element={<NotFound/>}/>
                <Route path={'*'} element={<Navigate to='/404'/>}/>
                <Route path={'/password-recovery'} element={<PasswordRecovery/>}/>
                <Route path={'/new-password'} element={<NewPassword/>}/>
                <Route path={'/test-components'} element={<TestComponents/>}/>

                </Routes>

                </div>
            }
        </div>
    );
}

export default App;
