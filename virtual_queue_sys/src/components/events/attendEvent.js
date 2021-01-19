import React, { Component } from 'react'
import { connect } from 'react-redux';
import { viewEventDetails, clearEvents, bookEvent } from '../../store/actions/eventActions'
import { Redirect } from 'react-router-dom'

export class attendEvent extends Component {
    state = {
        event_id: '',
        user_id: '',
        slot_id: ''
    }
    componentDidMount() {
        this.props.clearEvents()

    }

    handleChange = (e) => {
        if (e.target.id === 'slot_id')
            this.setState({
                [e.target.id]: parseInt(e.target.value)
            })
        else
            this.setState({
                [e.target.id]: e.target.value
            })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        console.log(e.target.id);
        console.log(this.state);
        if (e.target.id === 'book')
            this.props.bookEvent(this.state)
        else
            this.props.viewEventDetails(this.state.event_id)

    }

    bookSlot = (e) => {
        e.preventDefault();
        const data = { ...this.state, user_id: localStorage.getItem('user') }
        console.log(data);
        this.props.bookEvent(data)
    }

    render() {
        if (this.props.bookStatus) return <Redirect to='/confirmation' />
        if (!this.props.login_status) return <Redirect to='/signin' />

        return (
            <div className="container mt-5">
                <h3 className="text-primary">Attend an Event</h3><hr />
                <form className='form-group' onSubmit={this.handleSubmit}>
                    <label>Event ID:</label>
                    <input type='text' id="event_id" className="form-control mt-1 mb-2" placeholder="Unique ID of the event" onChange={this.handleChange}></input>
                    <button type="submit" className="btn btn-success mt-2" onClick={this.handleSubmit}>View Details</button>
                </form>
                <div className="mt-5">
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
                                    <table className="table table-hover">
                                        <thead>
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
                                                        <td><button id='slot_id' className="btn btn-primary" value={parseInt(slot.id)} onClick={this.handleChange}>Select slot</button></td>

                                                    </tr>

                                                )
                                            })}

                                        </tbody>


                                    </table>
                                </div>


                            </div> : null}
                        {this.state.slot_id ? <div className="my-2"><hr />
                            <br />
                            <b className="text-danger">Selected Slot : {this.state.slot_id}</b><br />
                            <button id="book" type="submit" className="btn btn-success mt-1" onClick={this.handleSubmit}>Book Slot</button>
                        </div> : null}
                    </div> : null}
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        eventDetails: state.event.eventDetails,
        event_slots: state.event.event_slots,
        bookStatus: state.event.bookStatus

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        viewEventDetails: (event_id) => dispatch(viewEventDetails(event_id)),
        clearEvents: () => dispatch(clearEvents()),
        bookEvent: (slot_details) => dispatch(bookEvent(slot_details)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(attendEvent)

