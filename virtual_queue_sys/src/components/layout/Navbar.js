import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import SignedLinks from './SignedLinks';
import SignedOutLinks from './SignedOutLinks';
const Navbar = (props) => {
    console.log(props.login_status);
    const link = props.login_status ? <SignedLinks /> : <SignedOutLinks />
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1"><Link className="brand" to='/'>VirtualQ</Link></span>
                    <div className="float-right">
                        {link}
                        {/* <NavLink to='addEvent'><button className="btn btn-light btn-small btn-outline-warning text-dark mx-2">Host</button></NavLink>
                        <NavLink to='#'><button className="btn btn-light btn-small btn-outline-warning text-dark mx-2">Attend</button></NavLink> */}
                    </div>
                </div>
            </nav>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status
    }
}
export default connect(mapStateToProps)(Navbar)
