import React from 'react'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">VirtualQ</span>
                    <div className="float-right">
                        <NavLink to='#'><button className="btn btn-light btn-small btn-outline-warning text-dark mx-2">Host</button></NavLink>
                        <NavLink to='#'><button className="btn btn-light btn-small btn-outline-warning text-dark mx-2">Attend</button></NavLink>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
