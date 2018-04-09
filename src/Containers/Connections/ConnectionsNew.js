import React, { Component } from 'react'

import ConnectionsForm from './ConnectionsForm.js'
import { fetchFormInfo, createResource } from '../../api'

export default class ConnectionsNew extends Component{
  constructor(){
    super()
    this.state = {
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
    if (this.props.history.location.state) {
      this.setState({engagements: [this.props.history.location.state.engagements]})
    }
    fetchFormInfo('connections')
    .then(
      data => {
        if (data.error) {
          console.log(data.error)
          alert('You must be logged in to access this page.')
          return this.props.history.push('/login')
        } else {
          return this.setState({ arms: data.arms, agencies: data.agencies, types: data.types, staff: data.staff, unresolved_engagements: data.unresolved_engagements})
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
    let engagements = s.engagements.map( title => s.unresolved_engagements.find( e => e.title === title).id)
    let attendees = s.attendees.map( fullname => s.staff.find( staff => staff.fullname === fullname).id)
    let info = {
      date: s.datetime,
      report: s.report,
      notes: s.notes,
      connection_type: s.type,
      arm: s.arm,
      agency: s.agency,
      attendees: attendees,
      engagements: engagements
    }
    createResource(info, 'connection', 'connections')
    .then( connection => this.props.history.push(connection.id.toString()))
  }


  render(){
    return(
      <div>
        <h1>Create a Connection</h1>
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
