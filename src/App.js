import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'

import './App.css';

import { logIn, register } from './api'

import NavBar from './NavBar/NavBar.js'
import Footer from './Footer/Footer.js'
import LoginForm from './Auth/LoginForm.js'
import RegistrationForm from './Auth/RegistrationForm.js'

import Home from './Home/Home.js'
import StaffHome from './Staff/StaffHome.js'
import AgenciesHome from './Agencies/AgenciesHome.js'
import ServicesHome from './Services/ServicesHome.js'

class App extends Component {

  constructor(){
    super()

    this.handleLogin = this.handleLogin.bind(this)
    // this.handleLogout = this.handleLogout.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)

  }

  handleLogin(params){
    logIn(params)
    .then(res => {
      if (res.token)
      {
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('id', res.staff_id)
      } else {
      alert(res.error)
      }})
      .then(() => this.props.history.push('/'))
  }

  handleRegistration(params){
    register(params)
    .then(res => {if (res.token)
      {
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('id', res.staff_id)
        this.setState({
          staffID: res.staff_id
        })
      } else {
      alert(res.error)
      }})
    .then(() => this.props.history.push('/'))

  }

  render() {
    return (
      <div className="App">
        {/* <NavBar/> */}
        <p className="App-intro">
          Welcome to the the ARM CRM by Business Relationship Management!
        </p>
          <Switch>
            <Route exact path='/login' render={(props) => <LoginForm handleLogin={this.handleLogin}/>} />
            <Route exact path='/register' render={() => <RegistrationForm handleRegistration={this.handleRegistration}/>} />
            <Route exact path='/' render={() => <Home/>} />

            {/* <Route exact path='/agencies' render={({history}) => <Agencies history={history}/>}/>
            <Route exact path='/agencies/new' render={({ match, history }) => <AgenciesNew history={history} match={match}/>}/>\
            <Route exact path='/agencies/:id/edit' render={({ match, history }) => <AgenciesEdit history={history} match={match}/>}/>
            <Route exact path='/agencies/:id' render={({ match, history }) => <AgenciesDetail history={history} match={match}/>}/> */}

            <Route path='/staff' render={({match, history}) => <StaffHome history={history} match={match}/>}/>
            <Route path='/agencies' render={({match, history}) => <AgenciesHome history={history} match={match}/>}/>
            <Route path='/services' render={({match, history}) => <ServicesHome history={history} match={match}/>}/>

            {/* <Route exact path='/services' render={({ history }) => <Services history={history}/>}/>
            <Route exact path='/services/new' render={({ match, history }) => <ServicesNew history={history} match={match}/>}/>
            <Route exact path='/services/:id/edit' render={({ match, history }) => <ServicesEdit history={history} match={match}/>}/>
            <Route exact path='/services/:id' render={({ match, history }) => <ServicesDetail history={history} match={match}/>}/>
   */}
          </Switch>

        {/* <Footer/> */}
      </div>
    );
  }
}

export default withRouter(App);
