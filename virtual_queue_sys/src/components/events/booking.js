import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

export class booking extends Component {

    render() {
        console.log(this.props);
        return (
            <div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        // userEvents: state.event.userEvents
    }
}

export default connect(mapStateToProps)(booking)
