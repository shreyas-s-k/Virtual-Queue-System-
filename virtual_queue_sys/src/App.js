import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard';
import addEvent from './components/events/addEvent';
import createSlot from './components/events/createSlot';
import eventDetails from './components/events/eventDetails';
import events from './components/events/events';
import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/hostEvent' component={addEvent} />
          <Route path='/createSlot' component={createSlot} />
          <Route path='/events' component={events} />
          <Route path='/event/:event_id' component={eventDetails} />

        </Switch>
      </BrowserRouter>


    )
  }
}

export default App
