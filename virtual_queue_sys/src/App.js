import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './components/dashboard';
import addEvent from './components/events/addEvent';
import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/addEvent' component={addEvent} />

        </Switch>
      </BrowserRouter>


    )
  }
}

export default App
