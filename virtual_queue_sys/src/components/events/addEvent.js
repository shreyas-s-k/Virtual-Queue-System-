import React, { Component, useState } from 'react'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-time-picker/dist/TimePicker.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createEvent } from '../../store/actions/eventActions';

export class addEvent extends Component {
    // const[selectedDate, setSelectedDate]=useState(null)
    state = {
        id: '',
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        date: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createEvent(this.state)
    }

    selectDate = (date) => {
        console.log('inside selectDate');
        console.log(date.getFullYear(), date.getMonth(), date.getDate());

        this.setState({
            date: date
        })
    }

    selectTime = (time, name) => {
        const tym = time.split(":").map(i => Number(i)).map(i => Number(i));
        const date = this.state.date
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate(), tym[0], tym[1], 0).toISOString());
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

    render() {
        if (!localStorage.getItem('login')) return <Redirect to='/signin' />
        console.log('hello');
        console.log(this.state);
        return (
            <div className="container col-sm-6 mt-5">
                <h3 className="text-primary"> Host an Event</h3><hr />
                <form className='form-group'>
                    <label>Event ID:</label>
                    <input type='text' id="id" className="form-control mt-1 mb-2" placeholder="Unique ID for the event" onChange={this.handleChange}></input>
                    <label>Name:</label>
                    <input type='text' id="name" className="form-control my-1" placeholder="Name of the event" onChange={this.handleChange}></input>
                    <label>Description:</label>
                    <textarea type='textarea' id="description" className="form-control mt-1 mb-2" placeholder="Brief description of event" onChange={this.handleChange}></textarea>
                    <div className="row my-3">
                        <div className="container col s5 ">
                            <label>Date:</label><br />
                            <DatePicker selected={this.state.date} onSelect={date => this.selectDate(date)} minDate={new Date()}></DatePicker><br /><br />
                        </div>
                        <div className="container col s5 ">
                            <label>Start-Time:</label><br />
                            <TimePicker onChange={(time) => this.selectTime(time, 'start_time')} />
                        </div>
                        <div className="container col s5 ">
                            <label>End-Time:</label><br />
                            <TimePicker onChange={(time) => this.selectTime(time, 'end_time')} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success mt-2" onClick={this.handleSubmit}>Host</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),

    }
}
export default connect(null, mapDispatchToProps)(addEvent)
