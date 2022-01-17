import React, { useCallback, useEffect} from 'react';
import {Login} from "./Components/Authorization/Login/Login";
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
import {setModalPropsAC, setModalTypeAC} from "./store/reducers/modal-reducer";
import {modalActionType, modalEntityType} from "./common/components/Modal/ModalContainer/ModalContainer";
import Profile from "./Components/Profile/Profile";
import Packs from "./Components/Packs/Packs";




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

     const setModalData = useCallback((modalAction:modalActionType,modalEntity:modalEntityType, id: string) => {
         dispatch(setModalPropsAC(id))
         dispatch(setModalTypeAC(modalAction,modalEntity))

     },[dispatch])

     const setModalDataCards=useCallback((modalAction:modalActionType,id: string)=>{
         setModalData(modalAction,'card',id)
     },[setModalData])
     const setModalDataPacks=useCallback((modalAction:modalActionType,id: string)=>{
         setModalData(modalAction,'pack',id)
     },[setModalData])



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
                             <Route path={'/cards'} element={<Cards setModalData={setModalDataCards}/>}>
                                 <Route path=":id" element={<Cards setModalData={setModalDataCards}/>}/>
                             </Route>
                             <Route path={'/packs'} element={<Packs setModalData={setModalDataPacks}/>}/>
                             <Route path={'/login'} element={<Login/>}/>

                         </Routes>}
                     </div>
                <div className={styles.err}>{error}</div>
             </div>
         )
 }


export default App;

