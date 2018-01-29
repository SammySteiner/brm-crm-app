import React, { Component } from 'react'

import AgenciesTable from './AgenciesTable'

import { getAgencies } from '../api'

export default class Agencies extends Component {
  constructor(){
    super()
    this.state = {
      agencies: [],
      search: '',
      name: false,
      acronym: false,
      cio: false,
      commissioner: false,
      arm: false

    }
  }

  componentDidMount() {
    getAgencies()
    .then( agencies => agencies.sort(function(a, b) {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0})
    )
    .then(agencies => this.setState({ agencies }))
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

  render(){
    const filteredList = this.state.agencies.filter( a =>  a.name.toLowerCase().includes(this.state.search.toLowerCase()) || a.acronym.toLowerCase().includes(this.state.search.toLowerCase()) || a.cio.fullname.toLowerCase().includes(this.state.search.toLowerCase()) || a.commissioner.fullname.includes(this.state.search) || a.arm.fullname.includes(this.state.search) )
    return(
      !this.state.agencies[0] ? <h1>Loading</h1> :
      <div className="agency-list">
        <div className="agency">
          <AgenciesTable
            sortedAndFilteredList={filteredList}
            handleSortName={this.handleSortName.bind(this)}
            handleSortAcronym={this.handleSortAcronym.bind(this)}
            handleSortCIO={this.handleSortCIO.bind(this)}
            handleSortCommissioner={this.handleSortCommissioner.bind(this)}
            handleSortARM={this.handleSortARM.bind(this)}
          />
        </div>
      </div>
    )
  }
}
