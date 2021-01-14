import React, { Component, useState } from 'react'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-time-picker/dist/TimePicker.css'

export class addEvent extends Component {
    // const[selectedDate, setSelectedDate]=useState(null)
    state = {
        name: '',
        location: '',
        date: new Date(),
        time: '',
        token_available: '',
    }

    selectDate = (date) => {
        console.log('inside selectDate');
        console.log(date);
        this.setState({
            date: date
        })
    }

    render() {
        console.log('hello');
        return (
            <div className="container mt-5">
                <h3> Host an Event</h3>
                <form className='form-group'>
                    <label>Name:</label>
                    <input type='text' className="form-control my-1" placeholder="Name of the event"></input>
                    <label>Location:</label>
                    <input type='text' className="form-control mt-1 mb-2" placeholder="Location where event is taking place"></input>
                    <label>Date:</label><br />
                    <DatePicker selected={this.state.date} onSelect={date => this.selectDate(date)} minDate={new Date()}></DatePicker><br /><br />
                    <label>Time:</label><br />
                    <input type="text" className="form-control mt-1" placeholder="HH:MM:SS"></input>

                    <button type="submit" className="btn btn-success my-3">Host</button>
                </form>
            </div>
        )
    }
}

export default addEvent
