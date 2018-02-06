import React, { Component } from 'react'

import ServicesForm from './ServicesForm.js'
import { fetchFormInfo, editResource } from '../api'

export default class ServicesEdit extends Component{
  constructor(props){
    super()
    this.state = {
      title: props.history.location.state.title,
      description: props.history.location.state.description,
      sla: props.history.location.state.sla,
      sdl: `${props.history.location.state.sdl.first_name} ${props.history.location.state.sdl.last_name}`,
      division: props.history.location.state.division.name,
      id: props.history.location.state.id,
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
        return this.setState({staffNames: data.staff, divisionNames: divisionNames, services: data.services })
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
    let info = {id: this.state.id, title: this.state.title, description: this.state.description, sla: this.state.sla, sdl: this.state.sdl, division: this.state.division}
    if (this.state.id && !this.state.services.filter( s => s.title.toLowerCase() === this.state.title.toLowerCase()).includes( s => s.id !== this.state.id)) {
      editResource(info, 'service', 'services/')
      .then( service => this.props.history.goBack())
    } else {
      alert(`The service title must be unique. ${this.state.title} is already the title of a service.`)
    }
  }


  render(){
    return(
      <div>
        <h1>Edit a Service</h1>
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
