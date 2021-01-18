import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { viewUserEvents } from '../../store/actions/eventActions';

export class events extends Component {
    componentDidMount() {
        this.props.viewUserEvents(localStorage.getItem('user'))
    }

    render() {
        if (!this.props.login_status) return <Redirect to='/signin' />
        console.log(this.props);

        return (
            <div className="container mt-5">
                <h3 className="text-primary">Your Events</h3><hr />
                <h5 className="text-danger">Hosted :    </h5>
                {this.props.events.length ?

                    <div class="list-group">
                        {this.props.events && this.props.events.map((event, index) => {
                            return (
                                <NavLink to={`/event/` + event.id} class="list-group-item list-group-item-action " aria-current="true">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{(index + 1) + " . " + event.name}</h5>
                                        <small>{event.time_updated ? new Date(event.time_updated).toDateString() : new Date(event.time_created).toDateString()}</small>
                                    </div>
                                    <p class="mb-1">{event.description}</p>
                                    <small>From {new Date(event.start_time).toUTCString()} To {new Date(event.end_time).toUTCString()} </small>
                                </NavLink>
                            )

                        })}

                    </div> :
                    <div className="alert alert-info my-2" role="alert">
                        No events in near future...!
</div>}


            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
        events: state.event.events

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        viewUserEvents: (user_id) => dispatch(viewUserEvents(user_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(events)
