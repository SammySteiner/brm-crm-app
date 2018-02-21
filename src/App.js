import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'

import { logIn, register } from './api'

import NavBar from './NavBar/NavBar.js'
import Footer from './Footer/Footer.js'
import LoginForm from './Auth/LoginForm.js'
import RegistrationForm from './Auth/RegistrationForm.js'
import { isAuthenticated } from './Hocs/isAuthenticated'
import Home from './Home/Home.js'

const AuthenticatedHomeContainer = isAuthenticated(Home)

class App extends Component {

  constructor(){
    super()

    this.handleLogin = this.handleLogin.bind(this)
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

  handleItemClick( e, { name }){
    this.props.history.push(name)
  }

  handleLogout(){
    localStorage.clear()
    return this.props.history.push('/login')
  }

  render() {
    return (
      <div className="App">
        <NavBar handleItemClick={this.handleItemClick.bind(this)} handleLogout={this.handleLogout.bind(this)}/>
          <Switch>
            <Route exact path='/login' render={({history}) => <LoginForm history={history} handleLogin={this.handleLogin}/>} />
            <Route exact path='/register' render={({history}) => <RegistrationForm history={history} handleRegistration={this.handleRegistration}/>} />
            <Route path='/' render={({match, history}) => <AuthenticatedHomeContainer history={history} match={match} />} />

            {/* <Route path='/staff' render={({match, history}) => <StaffHome history={history} match={match}/>}/>
            <Route path='/agencies' render={({match, history}) => <AgenciesHome history={history} match={match}/>}/>
            <Route path='/services' render={({match, history}) => <ServicesHome history={history} match={match}/>}/> */}

          </Switch>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default withRouter(App);
