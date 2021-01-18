import React, { Component } from 'react'
import { connect } from 'react-redux';
import { viewEventDetails } from '../../store/actions/eventActions'
import { Redirect } from 'react-router-dom'

export class eventDetails extends Component {
    componentDidMount() {
        this.props.viewEventDetails(this.props.match.params.event_id)
    }
    render() {
        if (!this.props.login_status) return <Redirect to='/signin' />
        console.log(this.props);
        return (

            <div className="container mt-5">
                {this.props.eventDetails ? <div>
                    <h3 className="text-primary"> Event Details </h3><hr />

                    <div class="card border-primary mb-3" >
                        <div class="card-header">ID: <b>{this.props.eventDetails.id}</b></div>
                        <div class="card-body text-primary">
                            <h5 class="card-title">{this.props.eventDetails.name}</h5>
                            <p class="card-text">{this.props.eventDetails.description}<br />
                        From {new Date(this.props.eventDetails.start_time).toUTCString()} To {new Date(this.props.eventDetails.end_time).toUTCString()}
                            </p>

                        </div>
                        <div className="card-footer"><small>Last Update : {this.props.eventDetails.time_updated ? new Date(this.props.eventDetails.time_updated).toDateString() : new Date(this.props.eventDetails.time_created).toDateString()}</small></div>
                    </div><br />
                    <h3 className="text-primary"> Event Slots </h3><hr />
                    {this.props.event_slots.length ?

                        <div>

                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Sl.No</th>
                                            <th>Start_Time</th>
                                            <th>End_Time</th>
                                            <th>Participant_limit</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {this.props.event_slots && this.props.event_slots.map((slot, index) => {
                                            return (

                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{slot.start_time}</td>
                                                    <td>{slot.end_time}</td>
                                                    <td>{slot.participant_limit}</td>

                                                </tr>

                                            )
                                        })}

                                    </tbody>


                                </table>
                            </div>


                        </div> : null}
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        eventDetails: state.event.eventDetails,
        event_slots: state.event.event_slots,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        viewEventDetails: (event_id) => dispatch(viewEventDetails(event_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(eventDetails)
