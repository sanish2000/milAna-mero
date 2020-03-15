import React from 'react';
import { Header } from './components/common/header/header.component';

import { LoginComponent } from './components/auth/login/login-component';

const App= function(){
    return <div className = "container">
        <Header isLoggedIn={false}></Header>
        <LoginComponent></LoginComponent>
    </div>
}
export default App;