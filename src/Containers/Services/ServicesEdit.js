import React, { Component } from 'react'

import ServicesForm from './ServicesForm.js'
import { fetchFormInfo, editResource } from '../../api'

export default class ServicesEdit extends Component{
  constructor(props){
    super()
    this.state = {
      title: '',
      description: '',
      sla: '',
      sdl: '',
      service_owner: '',
      division: '',
      id: '',
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
        return this.setState({
          staffNames: data.staff,
          divisionNames: divisionNames,
          services: data.services,
          title: this.props.history.location.state.title,
          description: this.props.history.location.state.description,
          sla: this.props.history.location.state.sla ?this.props.history.location.state.sla : '',
          sdl: `${this.props.history.location.state.sdl ? this.props.history.location.state.sdl.first_name + ' ' + this.props.history.location.state.sdl.last_name : "Data Not Available"}`,
          service_owner: `${this.props.history.location.state.service_owner ? this.props.history.location.state.service_owner.first_name + ' ' +this.props.history.location.state.service_owner.last_name : "Data Not Available"}`,
          division: this.props.history.location.state.division.name,
          id: this.props.history.location.state.id
        })
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
          service_owner={this.state.service_owner}
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
