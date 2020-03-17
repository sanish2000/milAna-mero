import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginComponent } from '../components/auth/login/login-component';
import RegiseterComponet from '../components/auth/register/regiseter.componet';
import { Header } from '../components/common/header/header.component';
import { NotFound } from '../components/common/notFound/notFound.component';
import { Sidebar } from '../components/common/sidebar/sidebar.component';

const Home = () => {
    return <p className="main">Home Component</p>
}

const Profile = () => {
    return <p className="main">Profile Component</p>
}


const Contact = () => {
    return <p className="main">Concats Component</p>
}

const Dashboard = () =>
{
    return <div className="main">
        <h2>Welcome to Dashboard</h2>
        <p>YOu ar in Dashboard</p>
    </div>
}



const AppRoutes = () => {
    return (
        <Router>
            <Header isLoggedIn={true}></Header>
            <Sidebar></Sidebar>
            <Switch>
                <Route exact path="/" component={LoginComponent}></Route>
                <Route path="/register" component={RegiseterComponet}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Router component={NotFound}></Router>
            </Switch>
        </Router>
    )
}


export default AppRoutes;