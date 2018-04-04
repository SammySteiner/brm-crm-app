import React, { Component } from 'react'

import ConnectionsForm from './ConnectionsForm.js'
import { fetchFormInfo, editResource } from '../../api'

export default class ConnectionsEdit extends Component{
  constructor(props){
    super()
    this.state = {
      id: '',
      datetime: '',
      report: '',
      notes: '',
      type: '',
      arm: '',
      agency: '',
      engagements: [],
      unresolved_engagements: [],
      attendees: [],
      arms: [],
      agencies: [],
      types: [],
      staff: []
    }
  }

  componentDidMount(){
    fetchFormInfo('connections')
    .then(
      data => { return this.setState({
        id: this.props.history.location.state.id,
        datetime: this.props.history.location.state.date,
        report: this.props.history.location.state.report,
        notes: this.props.history.location.state.notes,
        type: this.props.history.location.state.connection_type.via,
        arm: this.props.history.location.state.arm.fullname,
        agency: this.props.history.location.state.agency.name,
        engagements: this.props.history.location.state.engagements.map( e => e.title),
        attendees: this.props.history.location.state.staff_connections.map( sc => sc.fullname),
        arms: data.arms,
        agencies: data.agencies,
        types: data.types,
        staff: data.staff,
        unresolved_engagements: data.unresolved_engagements
       })}
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

  handleRadioChange = (e, { value }) => this.setState({ category: value })

  handleSubmit(event){
    event.preventDefault()
    let s = this.state
    let engagements = s.engagements.map( title => s.unresolved_engagements.find( e => e.title === title).id)
    let attendees = s.attendees.map( fullname => s.staff.find( staff => staff.fullname === fullname).id)
    let info = {
      id: s.id,
      date: s.datetime,
      report: s.report,
      notes: s.notes,
      connection_type: s.type,
      arm: s.arm,
      agency: s.agency,
      attendees: attendees,
      engagements: engagements
    }
    editResource(info, 'connection', 'connections')
    .then( connection => this.props.history.goBack())
  }

  render(){
    return(
      <div>
        <h1>Edit a Connection</h1>
        <ConnectionsForm
          datetime={this.state.datetime}
          report={this.state.report}
          notes={this.state.notes}
          type={this.state.type}
          arm={this.state.arm}
          agency={this.state.agency}
          engagements={this.state.engagements}
          unresolved_engagements={this.state.unresolved_engagements}
          attendees={this.state.attendees}
          arms={this.state.arms}
          agencies={this.state.agencies}
          types={this.state.types}
          staff={this.state.staff}
          handleInputChange={this.handleInputChange.bind(this)}
          handleRadioChange={this.handleRadioChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
