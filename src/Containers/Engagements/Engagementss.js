import React, { Component } from 'react'

import EngagementsTable from './EngagementsTable'
import Search from '../Search.js'

import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'

export default class Engagements extends Component {
  constructor(props){
    super(props)
    this.state = {
      engagements: [],
      search: '',
      startTime: true,
      agencies: false,
      arm: false,
      type: false,
    }
  }

  componentDidMount() {
    getDirectory('engagements')
    .then( engagements => engagements.sort(function(a, b) {
      var textA = a.start_time
      var textB = b.start_time
      return (textA < textB) ? 1 : (textA > textB) ? -1 : 0})
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
    .then(engagements => this.setState({ engagements }))
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
  handleSelectEngagement(event){
    return this.props.history.push("/engagements/" + event.currentTarget.id)
  }
  newEngagement(){
    return this.props.history.push("engagements/new")
  }

  handleSortDate(){
    let engagementsList = this.state.engagements
    if (this.state.startTime) {
      engagementsList.sort(function(a, b) {
        var textA = a.start_time
        var textB = b.start_time
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        engagementsList.sort(function(a, b) {
          var textA = a.start_time
          var textB = b.start_time
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {startTime: this.state.startTime ? false : true, engagements: engagementsList})
    this.setState(newState)
  }

  handleSortAgency(){
    let engagementsList = this.state.engagements
    if (this.state.agencies) {
      engagementsList.sort(function(a, b) {
        var textA = a.connection.agency.acronym
        var textB = b.connection.agency.acronym
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        engagementsList.sort(function(a, b) {
          var textA = a.connection.agency.acronym
          var textB = b.connection.agency.acronym
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {agencies: this.state.agencies ? false : true, engagements: engagementsList})
    this.setState(newState)
  }

  handleSortARM(){
    let engagementsList = this.state.engagements
    if (this.state.arm) {
      engagementsList.sort(function(a, b) {
        var textA = a.connection.arm
        var textB = b.connection.arm
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        engagementsList.sort(function(a, b) {
          var textA = a.connection.arm
          var textB = b.connection.arm
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {arm: this.state.arm ? false : true, engagements: engagementsList})
    this.setState(newState)
  }

  handleSortEngagementType(){
    let engagementsList = this.state.engagements
    if (this.state.type) {
      engagementsList.sort(function(a, b) {
        var textA = a.engagement_type.via
        var textB = b.engagement_type.via
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        engagementsList.sort(function(a, b) {
          var textA = a.engagement_type.via
          var textB = b.engagement_type.via
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {type: this.state.type ? false : true, engagements: engagementsList})
    this.setState(newState)
  }


  render(){
    console.log(this.state.engagements);
    const filteredList = this.state.engagements
    // const filteredList = this.state.connections.filter( c =>
    //   (c.arm ? c.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (c.agency ? c.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) || c.agency.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (c.connection_type ? c.connection_type.via.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (c.date ? new Date(c.date).toDateString().toLowerCase().includes(this.state.search.toLowerCase()): false))
    return(
      !this.state.engagements[0] ? <Loader active inline='centered' content='Loading'/> :
        <Grid padded>
          <Grid.Row columns={2}>
            <Grid.Column width={2} floated='left' >
              <Button type='button' onClick={this.newEngagement.bind(this)}>New Engagement</Button>
            </Grid.Column>
            <Grid.Column  floated='left' stretched width={10}>
                <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column >
              <EngagementsTable
                sortedAndFilteredList={filteredList}
                handleSelectAgency={this.handleSelectAgency.bind(this)}
                handleSelectStaff={this.handleSelectStaff.bind(this)}
                handleSelectEngagement={this.handleSelectEngagement.bind(this)}
                handleSelectConnection={this.handleSelectConnection.bind(this)}
                handleSortDate={this.handleSortDate.bind(this)}
                handleSortAgency={this.handleSortAgency.bind(this)}
                handleSortARM={this.handleSortARM.bind(this)}
                handleSortEngagementType={this.handleSortEngagementType.bind(this)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
