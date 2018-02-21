import React, { Component } from 'react'
import { Form, Grid, Container, Button } from 'semantic-ui-react'


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

  handleRegister(event){
    this.props.history.push('/register')
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
      <Container textAlign="left">
        <br/>
        <Grid centered>
          <Grid.Column width={8}>
            <h1>Login</h1>
            <br/>
            <Form onSubmit={this.handleSubmit.bind(this)}>
               <Form.Input label="Email:" type='text' value={this.state.email} onChange={this.handleChange.bind(this)} id='email'/>
              <Form.Input label="Password:" type='password' value={this.state.password} onChange={this.handleChange.bind(this)} id='password'/>
              <Button floated='right' primary size='large' type='submit' content='Log In' />
              <Button floated='left' secondary size='mini' content='Register' onClick={this.handleRegister.bind(this)} />
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
