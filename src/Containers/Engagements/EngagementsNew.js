import React, { Component } from 'react'

import EngagementsForm from './EngagementsForm.js'
import { fetchFormInfo, createResource } from '../../api'

export default class EngagementsNew extends Component{
  constructor(){
    super()
    this.state = {
      title: '',
      report: '',
      notes: '',
      type: '',
      ksr: '',
      inc: '',
      prj: '',
      priority: '',
      service: '',
      start_time: '',
      resolved_on: '',
      arm: '',
      agency: '',
      connection: '',
      team: [],
      types: [],
      staff: [],
      services: [],
      connections: []
    }
  }

  componentDidMount(){
    if (this.props.history.location.state) {
      this.setState({connection: this.props.history.location.state.connection})
    }
    fetchFormInfo('engagements')
    .then(
      data => {
        if (data.error) {
          console.log(data.error)
          alert('You must be logged in to access this page.')
          return this.props.history.push('/login')
        } else {
          return this.setState({ connections: data.connections, types: data.types, staff: data.staff, services: data.services})
        }
      }
    )
  }

  handleInputChange(event, data){
    let value = data.type === 'checkbox' ? data.checked : data.value
    this.setState({
      [data.id]: value
    })
  }

  handleRadioChange = (e, { value }) => this.setState({ priority: value })

  handleSubmit(event){
    event.preventDefault()
    let s = this.state
    let connection = s.connections.find( c => c.title === s.connection).id
    let info = {report: s.report, notes: s.notes, type: s.type, ksr: s.ksr, inc: s.inc, prj: s.prj, priority: s.priority, service: s.service, start_time: s.start_time, resolved_on: s.resolved_on, connection: connection, team: s.team}
    createResource(info, 'engagement', 'engagements')
    .then( engagement => this.props.history.push(engagement.id.toString()))
  }


  render(){
    return(
      <div>
        <h1>Add an Engagement</h1>
        <EngagementsForm
          title={this.state.title}
          report={this.state.report}
          notes={this.state.notes}
          type={this.state.type}
          ksr={this.state.ksr}
          prj={this.state.prj}
          inc={this.state.inc}
          priority={this.state.priority}
          service={this.state.service}
          start_time={this.state.start_time}
          resolved_on={this.state.resolved_on}
          arm={this.state.arm}
          agency={this.state.agency}
          connection={this.state.connection}
          connections={this.state.connections}
          team={this.state.team}
          types={this.state.types}
          staff={this.state.staff}
          services={this.state.services}
          handleInputChange={this.handleInputChange.bind(this)}
          handleRadioChange={this.handleRadioChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
