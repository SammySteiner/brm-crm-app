import React, { Component } from 'react'

import ServicesTable from './ServicesTable'
import Search from '../Search.js'

import { getDirectory } from '../../api'
import { Button, Grid, Loader } from 'semantic-ui-react'


export default class Services extends Component {
  constructor(){
    super()
    this.state = {
      services: [],
      search: '',
      title: false,
      description: false,
      division: false,
      sdl: false,
      service_owner: false
    }
  }

  componentDidMount() {
    getDirectory('services')
    .then( services => services.sort(function(a, b) {
      var textA = a.title.toUpperCase()
      var textB = b.title.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0})
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
    .then(services => this.setState({ services }))
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectService(event){
    return this.props.history.push("/services/" + event.target.id)
  }

  handleSelectStaff(event){
    return this.props.history.push("/staff/" + event.target.id)
  }

  newService(){
    return this.props.history.push("services/new")
  }

  handleSortTitle(){
    let servicesList = this.state.services
    if (this.state.title) {
      servicesList.sort(function(a, b) {
        var textA = a.title.toUpperCase()
        var textB = b.title.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        servicesList.sort(function(a, b) {
          var textA = a.title.toUpperCase()
          var textB = b.title.toUpperCase()
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {title: this.state.title ? false : true, services: servicesList})
    this.setState(newState)
  }

  handleSortDescription(){
    let servicesList = this.state.services
    if (this.state.description) {
      servicesList.sort(function(a, b) {
        var textA = a.description
        var textB = b.description
        return (textA < textB || textA === null) ? 1 : (textA > textB || textB === null ) ? -1 : 0
      })} else {
        servicesList.sort(function(a, b) {
          var textA = a.description
          var textB = b.description
          return (textA > textB || textA === null ) ? 1 : (textA < textB || textB === null) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {description: this.state.description ? false : true, services: servicesList})
    this.setState(newState)

  }
  handleSortDivision(){
    let servicesList = this.state.services
    if (this.state.division) {
      servicesList.sort(function(a, b) {
        var textA = a.division
        var textB = b.division
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.name > textB.name ) ? -1 : (textA.name < textB.name) ? 1 : 0
      })} else {
        servicesList.sort(function(a, b) {
          var textA = a.division
          var textB = b.division
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.name > textB.name ) ? 1 : (textA.name < textB.name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {division: this.state.division ? false : true, services: servicesList})
    this.setState(newState)

  }
  handleSortSDL(){
    let servicesList = this.state.services
    if (this.state.sdl) {
      servicesList.sort(function(a, b) {
        var textA = a.sdl
        var textB = b.sdl
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        servicesList.sort(function(a, b) {
          var textA = a.sdl
          var textB = b.sdl
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {sdl: this.state.sdl ? false : true, services: servicesList})
    this.setState(newState)
  }
  handleSortSO(){
    let servicesList = this.state.services
    if (this.state.service_owner) {
      servicesList.sort(function(a, b) {
        var textA = a.service_owner
        var textB = b.service_owner
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        servicesList.sort(function(a, b) {
          var textA = a.service_owner
          var textB = b.service_owner
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {service_owner: this.state.service_owner ? false : true, services: servicesList})
    this.setState(newState)
  }

  render(){
    const filteredList = this.state.services.filter( s =>  s.title.toLowerCase().includes(this.state.search.toLowerCase()) || ( s.description ? s.description.toLowerCase().includes(this.state.search.toLowerCase()) : false) || ( s.division ?  s.division.name.toLowerCase().includes(this.state.search.toLowerCase()) : false ) || ( s.sdl ? s.sdl.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) || ( s.service_owner ? s.service_owner.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false))
    return(
      !this.state.services[0] ? <Loader active inline='centered' content='Loading'/> :
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column width={2} floated='left' >
            <Button type='button' onClick={this.newService.bind(this)}>Add Services</Button>
          </Grid.Column>
          <Grid.Column floated='left' stretched width={10}>
            <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <ServicesTable
              sortedAndFilteredList={filteredList}
              handleSelectService={this.handleSelectService.bind(this)}
              handleSelectStaff={this.handleSelectStaff.bind(this)}
              handleSortTitle={this.handleSortTitle.bind(this)}
              handleSortDescription={this.handleSortDescription.bind(this)}
              handleSortDivision={this.handleSortDivision.bind(this)}
              handleSortSDL={this.handleSortSDL.bind(this)}
              handleSortSO={this.handleSortSDL.bind(this)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
