import React, {useEffect} from 'react';
import {Login} from "./Components/Authorization/Login/Login";
import {Profile} from "./Components/Profile/Profile";
import {Registration} from "./Components/Authorization/Redistration/Registration";
import {NotFound} from "./Components/NotFound/NotFound";
import {ForgotPassword} from "./Components/Authorization/ForgotPassword/ForgotPassword";
import {NewPassword} from "./Components/Authorization/NewPassword/NewPassword";
import {TestComponents} from "./Components/TestComponents/TestComponents";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "./Components/Header/Header";
import styles from './App.module.css'
import {initializeAppTC, RequestStatusType} from "./store/reducers/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import Preloader from "./common/Preloader/Preloader";
import {Cards} from "./Components/Cards/Cards";
import {Packs} from "./Components/Packs/Packs";


export type ComponentAuthType = 'register' | 'login' | 'forgotPass' | 'newPass'

function App() {
    console.log('app')
        let status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)
        const isInitialized = useSelector<RootReducerType, boolean>(state => state.app.isInitialized)
        const error = useSelector<RootReducerType, null | string>(state => state.app.error)
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(initializeAppTC())
        }, [dispatch])


        return (
            <div className={styles.appWrapper}>
                <Header/>
                    <div className={styles.mainBlock}>
                        {status === 'loading' && <Preloader />}
                        {!isInitialized ? <></> :
                        <Routes>
                            <Route path={'/'} element={<Navigate to='/profile'/>}/>
                            <Route path={'/profile'} element={<Profile/>}/>
                            <Route path={'/registration'} element={<Registration/>}/>
                            <Route path={'/404'} element={<NotFound/>}/>
                            <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
                            <Route path={'/new-password'} element={<NewPassword/>}>
                                <Route path=":token" element={<NewPassword/>}/>
                            </Route>
                            <Route path={'/test-components'} element={<TestComponents/>}/>
                            <Route path={'*'} element={<Navigate to='/404'/>}/>
                            <Route path={'/cards'} element={<Cards/>}>
                                <Route path=":id" element={<Cards/>}/>
                            </Route>
                            <Route path={'/packs'} element={<Packs/>}/>
                            <Route path={'/login'} element={<Login/>}/>


                        </Routes>}
                    </div>
               <div className={styles.err}>{error}</div>
            </div>
        );


    // let arr = [
    //     {id: 1, name: 'nasya', foo: 55},
    //     {id: 2, name: 'narrsya', foo: 325},
    //     {id: 3, name: 'nassrsrya', foo: 51},
    //     {id: 4, name: 'neeee', foo: 35},
    // ]
    // return (
    //     <table>
    //         <thead>
    //         <tr>
    //             <th>fsf</th>
    //             <th>sfs</th>
    //             <th>sfsf</th>
    //         </tr>
    //         </thead>
    //         <tbody>
    //         {arr.map(row=><tr>{Object.values(row).map(value=><td>{value}</td>)}</tr>)}
    //         </tbody>
    //     </table>
    // )
}

export default App;