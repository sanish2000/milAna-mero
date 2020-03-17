import React from 'react';
import { Link } from 'react-router-dom'
import './sidebar.component.css';

export const Sidebar = (props) => {
    return (
        <div className="sidenav">
            <Link to="/about">About</Link>
            <Link to="/linkbout">Services</Link>
            <Link to="/about">Clients</Link>
            <Link to="/about">Contacts</Link>
        </div>
    )
}