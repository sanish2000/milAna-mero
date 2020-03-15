import React from 'react';
import './header.compontent.css'

export const Header = function (props) {

    let navBar = props.isLoggedIn
        ? <div className="nav_bar">
            <ul className="nav_list">
                <li className="nav_item">Home</li>
                <li className="nav_item">Profile</li>
                <li className="nav_item float-right">Logout</li>
            </ul>
        </div>
        : <div className="nav_bar">
            <ul className="nav_list">
                <li className="nav_item">Home</li>
                <li className="nav_item float-right">Register</li>
                <li className="nav_item float-right">Login</li>
            </ul>
        </div>
    return (
        navBar 
    )
}