import React, { Component } from 'react'

export default class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(event){
    event.preventDefault()
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.handleLogin(this.state)
    this.setState({
      email: '',
      password: ''
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Email:</label>
        <input type='text' value={this.state.email} id='email' onChange={this.handleChange.bind(this)}/>
        <label>Password:</label>
        <input type='password' value={this.state.password} id='password' onChange={this.handleChange.bind(this)}/>
        <input type='submit' value='Log In' />
      </form>
    )
  }
}
