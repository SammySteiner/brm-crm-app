import React, { Component } from 'react'

import ConnectionsTable from './ConnectionsTable'
import Search from '../Search.js'

import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'

export default class Connections extends Component {
  constructor(props){
    super(props)
    this.state = {
      connections: [],
      search: '',
      date: false,
      agencies: false,
      arm: false,
      type: false,
      engagements: false
    }
  }

  componentDidMount() {
    getDirectory('connections')
    .then( connections => connections.sort(function(a, b) {
      var textA = a.date
      var textB = b.date
      return (textA < textB) ? 1 : (textA > textB) ? -1 : 0})
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
    .then(connections => this.setState({ connections }))
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectAgency(event){
    return this.props.history.push("/agencies/" + event.target.id)
  }
  handleSelectStaff(event){
    return this.props.history.push("/staff/" + event.target.id)
  }
  handleSelectConnection(event){
    return this.props.history.push("/connections/" + event.currentTarget.id)
  }
  newConnection(){
    return this.props.history.push("connections/new")
  }

  handleSortDate(){
    let connectionsList = this.state.connections
    if (this.state.date) {
      connectionsList.sort(function(a, b) {
        var textA = a.date
        var textB = b.date
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        connectionsList.sort(function(a, b) {
          var textA = a.date
          var textB = b.date
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {date: this.state.date ? false : true, connections: connectionsList})
    this.setState(newState)
  }

  handleSortAgency(){
    let connectionsList = this.state.connections
    if (this.state.agencies) {
      connectionsList.sort(function(a, b) {
        var textA = a.agency.acronym
        var textB = b.agency.acronym
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        connectionsList.sort(function(a, b) {
          var textA = a.agency.acronym
          var textB = b.agency.acronym
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {agencies: this.state.agencies ? false : true, connections: connectionsList})
    this.setState(newState)

  }

  handleSortARM(){
    let connectionsList = this.state.connections
    if (this.state.arm) {
      connectionsList.sort(function(a, b) {
        var textA = a.arm
        var textB = b.arm
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        connectionsList.sort(function(a, b) {
          var textA = a.arm
          var textB = b.arm
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {arm: this.state.arm ? false : true, connections: connectionsList})
    this.setState(newState)
  }

  handleSortConnectionType(){
    let connectionsList = this.state.connections
    if (this.state.type) {
      connectionsList.sort(function(a, b) {
        var textA = a.connection_type.via
        var textB = b.connection_type.via
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        connectionsList.sort(function(a, b) {
          var textA = a.connection_type.via
          var textB = b.connection_type.via
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {type: this.state.type ? false : true, connections: connectionsList})
    this.setState(newState)
  }

  handleSortNumberOfEngagements(){
    let connectionsList = this.state.connections
    if (this.state.engagements) {
      connectionsList.sort(function(a, b) {
        var textA = a.engagements.length
        var textB = b.engagements.length
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        connectionsList.sort(function(a, b) {
          var textA = a.engagements.length
          var textB = b.engagements.length
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {engagements: this.state.engagements ? false : true, connections: connectionsList})
    this.setState(newState)
  }

  render(){
    const filteredList = this.state.connections.filter( c =>
      (c.arm ? c.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (c.agency ? c.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) || c.agency.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (c.connection_type ? c.connection_type.via.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (c.date ? new Date(c.date).toDateString().toLowerCase().includes(this.state.search.toLowerCase()): false))
    return(
      !this.state.connections[0] ? <Loader active inline='centered' content='Loading'/> :
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column width={2} floated='left' >
              <Button type='button' onClick={this.newConnection.bind(this)}>New Connection</Button>
            </Grid.Column>
            <Grid.Column  floated='left' stretched width={10}>
                <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column >
              <ConnectionsTable
                sortedAndFilteredList={filteredList}
                handleSelectAgency={this.handleSelectAgency.bind(this)}
                handleSelectStaff={this.handleSelectStaff.bind(this)}
                handleSelectConnection={this.handleSelectConnection.bind(this)}
                handleSortDate={this.handleSortDate.bind(this)}
                handleSortAgency={this.handleSortAgency.bind(this)}
                handleSortARM={this.handleSortARM.bind(this)}
                handleSortConnectionType={this.handleSortConnectionType.bind(this)}
                handleSortNumberOfEngagements={this.handleSortNumberOfEngagements.bind(this)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
