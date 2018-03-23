import React, { Component } from 'react'

import ServicesForm from './ServicesForm.js'
import { fetchFormInfo, createResource } from '../../api'

export default class ServicesNew extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      description: '',
      sla: '',
      sdl: '',
      service_owner: '',
      division: '',
      services: [],
      divisionNames: [],
      staffNames: [],
      soStaff: [],
      sdlStaff: []
    }
  }

  componentDidMount(){
    fetchFormInfo('services')
    .then(
      data => {
        let divisionNames = data.divisions.map( d => d.name)
        return this.setState({ staffNames: data.staff, soStaff: data.so_staff, sdlStaff: data.sdl_staff, divisionNames: divisionNames, services: data.services })
      }
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
  }

  handleInputChange(event, data){
    let value = data.type === 'checkbox' ? data.checked : data.value
    this.setState({
      [data.id]: value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let info = {title: this.state.title, description: this.state.description, sla: this.state.sla, sdl: this.state.sdl, service_owner: this.state.service_owner, division: this.state.division}
    if (!this.state.services.map( s => s.title.toLowerCase() ).includes(this.state.title.toLowerCase())) {
      createResource(info, 'service', 'services')
      .then( service => this.props.history.push(service.id.toString()))
    } else {
      alert(`The service title must be unique. ${this.state.title} is already the title of a service.`)
    }
  }


  render(){
    return(
      <div>
        <h1>Add a Service</h1>
        <ServicesForm
          title={this.state.title}
          description={this.state.description}
          sla={this.state.sla}
          sdl={this.state.sdl}
          service_owner={this.state.service_owner}
          division={this.state.division}
          services={this.state.services}
          divisionNames={this.state.divisionNames}
          staffNames={this.state.staffNames}
          sdlStaff={this.state.sdlStaff}
          soStaff={this.state.soStaff}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
