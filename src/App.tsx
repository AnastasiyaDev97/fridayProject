import React from 'react';
import './App.css';
import {Login} from "./Components/Login/Login";
import {Profile} from "./Components/Profile/Profile";
import {Registration} from "./Components/Redistration/Registration";
import {NotFound} from "./Components/NotFound/NotFound";
import {PasswordRecovery} from "./Components/PasswordRecovery/PasswordRecovery";
import {NewPassword} from "./Components/NewPassword/NewPassword";
import {TestComponents} from "./Components/TestComponents/TestComponents";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "./Components/Header/Header";


function App() {
  return (
    <div>
        <Header/>
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
  );
}

export default App;
