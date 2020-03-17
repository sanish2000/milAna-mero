import React from 'react';
import './header.compontent.css'
import { Link } from 'react-router-dom';

const logout = ()=>{
     localStorage.clear()
}

export const Header = function (props) {

    let navBar = props.isLoggedIn
        ? <div className="nav_bar">
            <ul className="nav_list">
                <li className="nav_item">
                    <Link to="/home">Home</Link>
                </li>
                <li className="nav_item">
                    <Link to="/profile">Profile</Link>
                </li>
                <li className="nav_item">
                    <Link to="/contact">Contact</Link>
                </li>
                <li className="nav_item float-right">
                   <button className="btn btn-primary" onClick={logout}><Link to="/">Logout</Link></button> 
                </li>
            </ul>
        </div>
        : <div className="nav_bar">
            <ul className="nav_list">
            <li className="nav_item">Home</li>
                <li className="nav_item float-right">Register</li>
                <li className="nav_item float-right">Login</li> <li className="nav_item">
                    <Link to="/home">Home</Link>
                </li>
                <li className="nav_item float-right">
                    <Link to="/register">Register</Link>
                </li>
                <li className="nav_item float-right">
                    <Link to="/">Login</Link>
                </li>
            </ul>
        </div>
    return (
        navBar
    )
}