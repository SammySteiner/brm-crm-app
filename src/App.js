import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'

import { logIn, register, getDetails } from './api'

import NavBar from './Containers/NavBar/NavBar.js'
// import Footer from './Containers/Footer/Footer.js'
import LoginForm from './Containers/Auth/LoginForm.js'
import RegistrationForm from './Containers/Auth/RegistrationForm.js'
import { isAuthenticated } from './Hocs/isAuthenticated'
import Home from './Containers/Home/Home.js'

const AuthenticatedHomeContainer = isAuthenticated(Home)

class App extends Component {

  constructor(){
    super()
    this.state = {
      fullname: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)

  }

  componentDidMount(){
    if (localStorage.jwt) {
      getDetails('staff', localStorage.id)
      .then((data) => {this.setState({
        fullname: data.fullname
      })
    })}
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
        <NavBar fullname={this.state.fullname} handleItemClick={this.handleItemClick.bind(this)} handleLogout={this.handleLogout.bind(this)}/>
          <Switch>
            <Route exact path='/login' render={({history}) => <LoginForm history={history} handleLogin={this.handleLogin}/>} />
            <Route exact path='/register' render={({history}) => <RegistrationForm history={history} handleRegistration={this.handleRegistration}/>} />
            <Route path='/' render={({match, history}) => <AuthenticatedHomeContainer history={history} match={match} />} />
          </Switch>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default withRouter(App);
