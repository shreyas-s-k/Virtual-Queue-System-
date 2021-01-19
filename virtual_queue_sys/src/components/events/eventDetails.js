import React, { Component } from 'react'
import { connect } from 'react-redux';
import { viewEventDetails, viewParticipants } from '../../store/actions/eventActions'
import { Redirect } from 'react-router-dom'

export class eventDetails extends Component {
    componentDidMount() {
        this.props.viewEventDetails(this.props.match.params.event_id)
        this.props.viewParticipants(this.props.match.params.event_id)

    }
    render() {
        if (!this.props.login_status) return <Redirect to='/signin' />
        console.log(this.props);
        return (

            <div className="container mt-5">
                {this.props.eventDetails ? <div>
                    <h3 className="text-primary"> Event Details </h3><hr />

                    <div class="card border-primary mb-3 shadow" >
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
                                            <th>Slot_ID</th>
                                            <th>Start_Time</th>
                                            <th>End_Time</th>
                                            <th>Participant_limit</th>
                                            <th>Available_Tokens</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {this.props.event_slots && this.props.event_slots.map((slot, index) => {
                                            return (

                                                <tr>
                                                    <td>{slot.id}</td>
                                                    <td>{new Date(slot.start_time).toUTCString()}</td>
                                                    <td>{new Date(slot.end_time).toUTCString()}</td>
                                                    <td>{slot.participant_limit}</td>
                                                    <td>{slot.available_tokens}</td>

                                                </tr>

                                            )
                                        })}

                                    </tbody>


                                </table>
                            </div>


                        </div> : null}<br />

                    {this.props.participants.length ?

                        <div>
                            <h3 className="text-primary"> Event Participants </h3><hr />
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Sl.No</th>
                                            <th>Slot_ID</th>
                                            <th>User_ID</th>

                                            <th>Token</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {this.props.participants && this.props.participants.map((participant, index) => {
                                            return (

                                                <tr>
                                                    <td>{participant.id}</td>
                                                    <td>{participant.slot_id}</td>
                                                    <td>{participant.user_id}</td>
                                                    <td>{participant.token}</td>

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
        participants: state.event.participants

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        viewEventDetails: (event_id) => dispatch(viewEventDetails(event_id)),
        viewParticipants: (event_id) => dispatch(viewParticipants(event_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(eventDetails)
