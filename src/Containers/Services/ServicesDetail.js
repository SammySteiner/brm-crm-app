import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../../api'

export default class ServiceDetail extends Component {
  constructor(props){
    super()
    this.state = {
      service: {}
    }
  }

  componentDidMount(){
    getDetails('services', this.props.match.params.id)
    .then(service =>
      {if (service.error) {
        console.log(service.error)
        alert('You must be logged in to access this page.')
        return this.props.history.push('/login')
      } else {
        return this.setState({service: service})
      }}
      )
  }

  handleDelete(event){
    deleteResource('services', this.state.service.id)
    .then( service => alert(`${service.title}, lead by ${service.sdl.fullname}, has successfully been deleted from the databse`))
    .then( () => this.props.history.goBack())
  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.service.id + "/edit",
      state: this.state.service
    })
  }


  render(){
    return(
      !this.state.service.id ? <h1>Loading</h1> :
      <div>
        <ul className='staff-detail'>
          <li>Title: {this.state.service.title}</li>
          <li>Description: {this.state.service.description}</li>
          <li>SLA: {this.state.service.sla}</li>
          <li>SDL: {this.state.service.sdl.first_name} {this.state.service.sdl.last_name}</li>
          <li>Division: {this.state.service.division.name}</li>
          <li>Deputy Commissioner: {this.state.service.deputy_commissioner.first_name} {this.state.service.deputy_commissioner.last_name}</li>
        </ul>
        <button onClick={this.handleDelete.bind(this)}>Delete</button>
        <button onClick={this.handleEdit.bind(this)}>Edit</button>
      </div>

    )
  }
}
