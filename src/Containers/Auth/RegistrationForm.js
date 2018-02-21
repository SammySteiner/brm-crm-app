import React, { Component } from 'react'
import { getUserEmails } from '../../api'
import { Form, Grid, Container, Button } from 'semantic-ui-react'

export default class RegistrationForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      allUsers: [],
      registeredUsers: []
    }
  }

  componentDidMount(){
    getUserEmails()
    .then( res => {
      this.setState({
        allUsers: res.all_users,
        registeredUsers: res.registered_users
      })
    })
  }

  handleChange(event){
    event.preventDefault()
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.checkPasswordConfirmation().length > 0 || this.checkUserEmailTaken().length > 0 || this.checkUserEmailexists().length > 0) {
      var message = ""
      message += this.checkPasswordConfirmation()
      message += this.checkUserEmailTaken()
      message += this.checkUserEmailexists()
      alert(message)
    } else {
      this.props.handleRegistration(this.state)
      this.setState({
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  }

  checkPasswordConfirmation(){
    return this.state.password === this.state.password_confirmation ? '' : "Passowrd and password confirmation do not match. "
  }

  checkUserEmailTaken(){
    return this.state.registeredUsers.some( ru => ru.email === this.state.email) ? "This email is already associated with an account. " : ''
  }

  checkUserEmailexists(){
    return this.state.allUsers.some( au => au.email === this.state.email) ? '' : 'This email must be added to the CRM by an admin. Please contact an Agency Relations Manager to be added to the CRM.'
  }

  handleLogin(event){
    this.props.history.push('/login')
  }

  render(){
    return (
      <Container textAlign="left">
        <br/>
        <Grid centered>
          <Grid.Column width={8}>
            <h1>Register</h1>
            <br/>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Input label="Email:" type='text' value={this.state.email} onChange={this.handleChange.bind(this)} id='email'/>
              <Form.Input label="Password:" type='password' value={this.state.password} onChange={this.handleChange.bind(this)} id='password'/>
              <Form.Input label="Password Confirmation:" type='password' value={this.state.password_confirmation} onChange={this.handleChange.bind(this)} id='password_confirmation'/>
              <Button floated='right' primary size='large' type='submit' content='Register' />
              <Button floated='left' secondary size='mini' content='Login' onClick={this.handleLogin.bind(this)} />
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
