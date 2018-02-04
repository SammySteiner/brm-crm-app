import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';

import NavBar from './NavBar/NavBar.js'
import Footer from './Footer/Footer.js'

import Agencies from './Agencies/Agencies.js'
import AgenciesDetail from './Agencies/AgenciesDetail.js'
import AgenciesNew from './Agencies/AgenciesNew.js'

import Staffs from './Staff/Staffs.js'
import StaffDetail from './Staff/StaffDetail.js'
import StaffNew from './Staff/StaffNew.js'

import Services from './Services/Services.js'
import ServicesDetail from './Services/ServicesDetail.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <p className="App-intro">
          Welcome to the the ARM CRM by Business Relationship Management!
        </p>
        <Switch>
          <Route exact path='/agencies' render={({history}) => <Agencies history={history}/>}/>
          <Route exact path='/agencies/new' render={({ match, history }) => <AgenciesNew history={history} match={match}/>}/>\
          <Route exact path='/agencies/:id' render={({ match, history }) => <AgenciesDetail history={history} match={match}/>}/>

          <Route exact path='/staff' render={({ history }) => <Staffs history={history}/>}/>
          <Route exact path='/staff/new' render={({ match, history }) => <StaffNew history={history} match={match}/>}/>\
          <Route exact path='/staff/:id' render={({ match, history }) => <StaffDetail history={history} match={match}/>}/>

          <Route exact path='/services' render={({ history }) => <Services history={history}/>}/>
          <Route exact path='/services/:id' render={({ match, history }) => <ServicesDetail history={history} match={match}/>}/>

        </Switch>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
