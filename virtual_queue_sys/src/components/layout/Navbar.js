import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import SignedLinks from './SignedLinks';
import SignedOutLinks from './SignedOutLinks';
import '../../loading.css'
const Navbar = (props) => {
    console.log(props);
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
            {props.loading1 ?
                <div className="linear-progress small">
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                </div> : null}


        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        loading1: state.auth.loading,
        loading2: state.event.loading
    }
}
export default connect(mapStateToProps)(Navbar)
