import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import { createSlots, finishCreateEvent, viewSlots } from '../../store/actions/eventActions';
import { Link } from 'react-router-dom'


export class createSlot extends Component {
    state = {
        start_time: '',
        end_time: '',
        event_id: '',
        participant_limit: 0,

    }

    selectTime = (time, name) => {
        const tym = time.split(":").map(i => Number(i)).map(i => Number(i));
        const date = new Date(this.props.event_date)
        // console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate(), tym[0], tym[1], 0).toISOString());
        if (name === 'start_time') {
            this.setState({
                start_time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), tym[0], tym[1], 0).toISOString()
            })
        }
        else if (name === 'end_time') {
            this.setState({
                end_time: new Date(date.getFullYear(), date.getMonth(), date.getDate(), tym[0], tym[1], 0).toISOString()
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: parseInt(e.target.value)
        })
    }
    handleSubmit = (e) => {
        const slot = { ...this.state, event_id: this.props.event_id }
        e.preventDefault();
        console.log(slot);
        this.props.createSlots(slot, this.props.event_id)
        // this.props.viewSlots(this.props.event_id)



    }
    finishCreateEvent = (e) => {
        this.props.finishCreateEvent();
    }

    render() {

        if (!this.props.createEvent_status) return <Redirect to='/hostEvent' />
        if (!this.props.login_status) return <Redirect to='/signin' />
        return (

            <div className="container-fluid mt-5 ">
                <div className="row mx-5">
                    <div className="col s12 m6">
                        <h3 className="text-primary"> Create slots for the event</h3><hr />
                        <div className="row my-3">

                            <div className="container col s5 ">
                                <label>Start-Time:</label><br />
                                <TimePicker onChange={(time) => this.selectTime(time, 'start_time')} />
                            </div>
                            <div className="container col s5 ">
                                <label>End-Time:</label><br />
                                <TimePicker onChange={(time) => this.selectTime(time, 'end_time')} />
                            </div>






                        </div>
                        <label>Participants Limit:</label><br />
                        <input type='text' id="participant_limit" className="form-control mt-1" placeholder="Restrict number of participants" onChange={this.handleChange}></input><hr />

                        <button type="submit" className="btn btn-success mt-2" onClick={this.handleSubmit}>Create Slot</button>
                    </div>
                    <div className="col s12 m5 offset-m1 events">
                        {this.props.event_slots.length ?

                            <div>
                                <h3 className="text-primary"> Current Slots</h3><hr />
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Slot_ID</th>
                                                <th>Start_Time</th>
                                                <th>End_Time</th>
                                                <th>Participant_limit</th>

                                            </tr>

                                        </thead>
                                        <tbody>
                                            {this.props.event_slots && this.props.event_slots.map((slot, index) => {
                                                return (

                                                    <tr>
                                                        <td>{slot.id}</td>
                                                        <td>{slot.start_time}</td>
                                                        <td>{slot.end_time}</td>
                                                        <td>{slot.participant_limit}</td>

                                                    </tr>

                                                )
                                            })}

                                        </tbody>


                                    </table>
                                </div>
                                <Link to='/'><button type="submit" className="btn btn-success" onClick={this.finishCreateEvent}>Host</button></Link>

                            </div> : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        event_id: state.event.event_id,
        event_date: state.event.event_date,
        event_slots: state.event.event_slots,
        createEvent_status: state.event.createEvent_status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSlots: (slot, event_id) => dispatch(createSlots(slot, event_id)),
        // viewSlots: (event_id) => dispatch(viewSlots(event_id)),
        finishCreateEvent: () => dispatch(finishCreateEvent())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(createSlot)
