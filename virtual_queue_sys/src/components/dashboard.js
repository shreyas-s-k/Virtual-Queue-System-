import React, { Component } from 'react'
import { connect } from 'react-redux'
import { displayEvents } from '../store/actions/eventActions'
import { Link } from 'react-router-dom'
class Dashboard extends Component {
    render() {
        console.log(this.props.events);
        return (
            <div className='container mt-5'>

                <div className="row">
                    <div className="col s12 m6">
                        <div className="alert alert-success">
                            dfioahfoiafhoifjafiajfiajfoiafjoiajfoaijfoiajfoaifjaifjaoifhafioahfoiajfoiafoiahfaoifhaoifhafihaofh uhdfoihfwoifhwoifhwfowihfwoifhwoi
                        </div>
                    </div>
                    <div className="col s12 m5 offset-m1 events">

                        <h2>Available Events</h2><br />
                        {this.props.events.length ? <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Event_ID</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Available Tokens</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {this.props.events && this.props.events.map((event, index) => {
                                        return (

                                            <tr>
                                                <td>{event.id}</td>
                                                <td>{event.name}</td>
                                                <td>{event.location}</td>
                                                <td>{event.date.toDateString()}</td>
                                                <td>{event.time}</td>
                                                <td>{event.token_available}<br />
                                                    {event.token_available > 0 ? <Link to='/addEvent' ><button type="button" className="btn btn-dark btn-s">Attend</button></Link> : null}</td>
                                            </tr>

                                        )
                                    })}

                                </tbody>


                            </table>
                        </div> : <div className="alert alert-info">No events in near future...!</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        events: state.event.events
    }
}

export default connect(mapStateToProps)(Dashboard)

