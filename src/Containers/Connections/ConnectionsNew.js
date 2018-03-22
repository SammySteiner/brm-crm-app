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
      data => {
        if (data.error) {
          console.log(data.error)
          alert('You must be logged in to access this page.')
          return this.props.history.push('/login')
        } else {
          return this.setState({ arms: data.arms, agencies: data.agencies, types: data.types, staff: data.staff})
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
    let info = {
      date: s.datetime,
      report: s.report,
      notes: s.notes,
      connection_type: s.type,
      arm: s.arm,
      agency: s.agency,
      attendees: s.attendees
    }
    createResource(info, 'connection', 'connections')
    .then( connection => this.props.history.push(connection.id.toString()))
  }


  render(){
    return(
      <div>
        <h1>Add a Connection</h1>
        <ConnectionsForm
          datetime={this.state.datetime}
          report={this.state.report}
          notes={this.state.notes}
          type={this.state.type}
          arm={this.state.arm}
          agency={this.state.agency}
          engagements={this.state.engagements}
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
