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
          return this.setState({
            id: this.props.history.location.state.id,
            title: this.props.history.location.state.title,
            report: this.props.history.location.state.report,
            notes: this.props.history.location.state.notes,
            type: this.props.history.location.state.type,
            ksr: this.props.history.location.state.ksr,
            inc: this.props.history.location.state.inc,
            prj: this.props.history.location.state.prj,
            priority: this.props.history.location.state.priority,
            service: this.props.history.location.state.service,
            created_by: this.props.history.location.state.created_by,
            created_on: this.props.history.location.state.created_on,
            last_modified_by: this.props.history.location.state.last_modified_by,
            last_modified_on: this.props.history.location.state.last_modified_on,
            start_time: this.props.history.location.state.start_time,
            resolved_on: this.props.history.location.state.resolved_on,
            resolution_notes: this.props.history.location.state.resolution_notes,
            arm: this.props.history.location.state.arm,
            agency: this.props.history.location.state.agency,
            connection: this.props.history.location.state.connection,
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

  handleRadioChange = (e, { value }) => this.setState({ category: value })

  handleSubmit(event){
    event.preventDefault()
    let s = this.state
    let info = {title: s.title, report: s.report, notes: s.notes, type: s.type, ksr: s.ksr, inc: s.inc, prj: s.prj, priority: s.priority, service: s.service, start_time: s.start_time, resolved_on: s.resolved_on, resolution_notes: s.resolution_notes, connection: s.connection, created_on: s.created_on, created_by: s.created_by, last_modified_by: s.last_modified_by, last_modified_on: s.last_modified_on}
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
