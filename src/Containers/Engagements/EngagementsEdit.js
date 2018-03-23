import React, { Component } from 'react'

import EngagementsForm from './EngagementsForm.js'
import { fetchFormInfo, editResource } from '../../api'

export default class EngagementsEdit extends Component{
  constructor(){
    super()
    this.state = {
      id: '',
      title: '',
      report: '',
      notes: '',
      type: '',
      ksr: '',
      inc: '',
      prj: '',
      priority: '',
      service: '',
      created_by: '',
      created_on: '',
      last_modified_by: '',
      last_modified_on: '',
      start_time: '',
      resolved_on: '',
      resolution_notes: '',
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
    fetchFormInfo('engagements')
    .then(
      data => {
        if (data.error) {
          console.log(data.error)
          alert('You must be logged in to access this page.')
          return this.props.history.push('/login')
        } else {
          var s = this.props.history.location.state
          return this.setState({
            id: s.id,
            title: s.title,
            report: s.report,
            notes: s.notes,
            type: s.engagement_type.via,
            ksr: s.ksr,
            inc: s.inc,
            prj: s.prj ? s.prj : '',
            priority: s.priority.toString(),
            service: s.service.title,
            team: s.staff_engagements.map( se => se.staff.fullname),
            created_by: s.created_by,
            created_on: s.created_on,
            last_modified_by: s.last_modified_by,
            last_modified_on: s.last_modified_on,
            start_time: s.start_time,
            resolved_on: s.resolved_on ? s.resolved_on : '',
            resolution_notes: s.resolution_notes ? s.resolution_notes : '',
            arm: s.arm,
            agency: s.agency,
            connection: s.connection.title,
            connections: data.connections,
            types: data.types,
            staff: data.staff,
            services: data.services
          })
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
    let info = {id: s.id, title: s.title, report: s.report, notes: s.notes, type: s.type, ksr: s.ksr, inc: s.inc, prj: s.prj, priority: s.priority, service: s.service, start_time: s.start_time, resolved_on: s.resolved_on, resolution_notes: s.resolution_notes, connection: connection, team: s.team}
    editResource(info, 'engagement', 'engagements')
    .then( engagement => this.props.history.goBack())
  }


  render(){
    return(
      <div>
        <h1>Add a Connection</h1>
        <EngagementsForm
          id={this.state.id}
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
          resolution_notes={this.state.resolution_notes}
          created_by={this.state.created_by}
          created_on={this.state.created_on}
          last_modified_by={this.state.last_modified_by}
          last_modified_on={this.state.last_modified_on}
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
