import React, { Component } from 'react'

import AgenciesTable from './AgenciesTable'
import Search from '../Search.js'

import { getDirectory } from '../api'

export default class Agencies extends Component {
  constructor(props){
    super(props)
    this.state = {
      agencies: [],
      search: '',
      name: false,
      acronym: false,
      cio: false,
      commissioner: false,
      arm: false,
      mayoral: false

    }
  }

  componentDidMount() {
    getDirectory('agencies')
    .then( agencies => agencies.sort(function(a, b) {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0})
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })

    .then(agencies => this.setState({ agencies }))
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

  newAgency(){
    return this.props.history.push("agencies/new")
  }

  handleSortName(){
    let agenciesList = this.state.agencies
    if (this.state.name) {
      agenciesList.sort(function(a, b) {
        var textA = a.name.toUpperCase()
        var textB = b.name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        agenciesList.sort(function(a, b) {
          var textA = a.name.toUpperCase()
          var textB = b.name.toUpperCase()
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {name: this.state.name ? false : true, agencies: agenciesList})
    this.setState(newState)
  }

  handleSortAcronym(){
    let agenciesList = this.state.agencies
    if (this.state.acronym) {
      agenciesList.sort(function(a, b) {
        var textA = a.acronym
        var textB = b.acronym
        return (textA < textB || textA === null) ? 1 : (textA > textB || textB === null ) ? -1 : 0
      })} else {
        agenciesList.sort(function(a, b) {
          var textA = a.acronym
          var textB = b.acronym
          return (textA > textB || textA === null ) ? 1 : (textA < textB || textB === null) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {acronym: this.state.acronym ? false : true, agencies: agenciesList})
    this.setState(newState)

  }
  handleSortCIO(){
    let agenciesList = this.state.agencies
    if (this.state.cio) {
      agenciesList.sort(function(a, b) {
        var textA = a.cio
        var textB = b.cio
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        agenciesList.sort(function(a, b) {
          var textA = a.cio
          var textB = b.cio
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {cio: this.state.cio ? false : true, agencies: agenciesList})
    this.setState(newState)

  }
  handleSortCommissioner(){
    let agenciesList = this.state.agencies
    if (this.state.commissioner) {
      agenciesList.sort(function(a, b) {
        var textA = a.commissioner
        var textB = b.commissioner
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        agenciesList.sort(function(a, b) {
          var textA = a.commissioner
          var textB = b.commissioner
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {commissioner: this.state.commissioner ? false : true, agencies: agenciesList})
    this.setState(newState)
  }

  handleSortARM(){
    let agenciesList = this.state.agencies
    if (this.state.arm) {
      agenciesList.sort(function(a, b) {
        var textA = a.arm
        var textB = b.arm
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? -1 : (textA.last_name < textB.last_name) ? 1 : 0
      })} else {
        agenciesList.sort(function(a, b) {
          var textA = a.arm
          var textB = b.arm
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.last_name > textB.last_name ) ? 1 : (textA.last_name < textB.last_name) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {arm: this.state.arm ? false : true, agencies: agenciesList})
    this.setState(newState)
  }
  handleSortMayoral(){
    let agenciesList = this.state.agencies
    if (this.state.mayoral) {
      agenciesList.sort(function(a, b) {
        var textA = a.mayoral
        var textB = b.mayoral
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA > textB ) ? -1 : (textA < textB) ? 1 : 0
      })} else {
        agenciesList.sort(function(a, b) {
          var textA = a.mayoral
          var textB = b.mayoral
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA > textB ) ? 1 : (textA < textB) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {mayoral: this.state.mayoral ? false : true, agencies: agenciesList})
    this.setState(newState)
  }

  render(){
    const filteredList = this.state.agencies.filter( a =>  a.name.toLowerCase().includes(this.state.search.toLowerCase()) || (a.acronym ? a.acronym.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (a.cio ?  a.cio.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false ) || (a.commissioner ? a.commissioner.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (a.arm ? a.arm.fullname.toLowerCase().includes(this.state.search.toLowerCase()) : false))
    return(
      !this.state.agencies[0] ? <h1>Loading</h1> :
      <div className="agency-list">
        <div className="agency">
          <Search search={this.state.search} handleChange={this.handleChange.bind(this)}/>
          <button type='button' onClick={this.newAgency.bind(this)}>Add an Agency</button>
          <AgenciesTable
            sortedAndFilteredList={filteredList}
            handleSelectAgency={this.handleSelectAgency.bind(this)}
            handleSelectStaff={this.handleSelectStaff.bind(this)}
            handleSortName={this.handleSortName.bind(this)}
            handleSortAcronym={this.handleSortAcronym.bind(this)}
            handleSortCIO={this.handleSortCIO.bind(this)}
            handleSortCommissioner={this.handleSortCommissioner.bind(this)}
            handleSortARM={this.handleSortARM.bind(this)}
            handleSortMayoral={this.handleSortMayoral.bind(this)}
          />
        </div>
      </div>
    )
  }
}
