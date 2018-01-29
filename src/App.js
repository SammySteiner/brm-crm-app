import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';

import NavBar from './NavBar/NavBar.js'
import Footer from './Footer/Footer.js'

import Agencies from './Agencies/Agencies.js'
import Staffs from './Staff/Staffs.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <p className="App-intro">
          Welcome to the the ARM CRM by Business Relationship Management!
        </p>
        <Switch>
          <Route path='/agencies' render={() => <Agencies/>}/>
          <Route path='/staff' render={() => <Staffs/>}/>
        </Switch>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
