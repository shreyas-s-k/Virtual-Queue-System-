import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

const confirmation = (props) => {
    if (!props.login_status) return <Redirect to='/signin' />
    console.log(props);
    return (
        <div className="container col-sm-5 mt-5">
            <h3 className="text-primary"> Booking Details </h3><hr />
            {props.eventDetails ?


                <div class="card border-primary mb-3" >
                    <div class="card-header">ID: <b>{props.eventDetails.id}</b></div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">{props.eventDetails.name}</h5>
                        <p class="card-text">{props.eventDetails.description}<br />
                        From {new Date(props.eventDetails.start_time).toUTCString()} To {new Date(props.eventDetails.end_time).toUTCString()}
                        </p>
                        <hr />
                        <center><b><big><p className="text-danger">Slot_ID &nbsp;: {props.bookStatus.slot_id}<br />
                        Token &nbsp;&nbsp;&nbsp;: {props.bookStatus.token}</p></big></b></center>




                    </div>


                </div>
                : null}
            <Link to='/' className="d-grid gap-2 dashbtn"><button type="submit" className="btn btn-outline-primary  mt-3 mb-4 ">Go back to Dashboard</button></Link>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        eventDetails: state.event.eventDetails,
        bookStatus: state.event.bookStatus

    }
}
export default connect(mapStateToProps)(confirmation)
