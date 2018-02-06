import React, { Component } from 'react'

import ServicesForm from './ServicesForm.js'
import { fetchFormInfo, createResource } from '../api'

export default class ServicesNew extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      description: '',
      sla: '',
      sdl: '',
      division: '',
      services: [],
      divisionNames: [],
      staffNames: []
    }
  }

  componentDidMount(){
    fetchFormInfo('services')
    .then(
      data => {
        let divisionNames = data.divisions.map( d => d.name)
        return this.setState({ staffNames: data.staff, divisionNames: divisionNames, services: data.services })
      }
    )
  }

  handleInputChange(event){
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [event.target.id]: value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let info = {title: this.state.title, description: this.state.description, sla: this.state.sla, sdl: this.state.sdl, division: this.state.division}
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
          division={this.state.division}
          services={this.state.services}
          divisionNames={this.state.divisionNames}
          staffNames={this.state.staffNames}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
