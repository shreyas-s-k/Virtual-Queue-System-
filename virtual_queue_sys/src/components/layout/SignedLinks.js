import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../../store/actions/authActions'
import { Link } from 'react-router-dom'

const SignedLinks = (props) => {
    return (
        <ul className="list-inlinepy-1 my-1">
            <li className="list-inline-item mx-2"><Link to='/events' className="navigation" ><button type="button" className="btn btn-outline-light">Events</button></Link></li>
            <li className="list-inline-item mx-2"><a className="navigation" onClick={props.userLogout}><button type="button" className="btn btn-outline-light">Logout</button></a></li>

        </ul>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(userLogout())
    }
}
export default connect(null, mapDispatchToProps)(SignedLinks);