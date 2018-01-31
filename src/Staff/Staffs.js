import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import StaffList from './StaffList'
import StaffTable from './StaffTable'
import Search from '../Search.js'

import { getDirectory } from '../api'

export default class Staffs extends Component {
  constructor(){
    super()
    this.state = {
      staffs: [],
      abc: false,
      role: false,
      agency: false,
      search: ''
    }
  }

  componentDidMount(){
    getDirectory('staff')
    .then( staffs => staffs.sort(function(a, b) {
      var textA = a.last_name.toUpperCase()
      var textB = b.last_name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0})
    )
    .then( staffs => this.setState({ staffs }))
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSelectStaff(event){
    return this.props.history.push("/staff/" + event.target.id)
  }
  handleSelectAgency(event){
    return this.props.history.push("/agencies/" + event.target.id)
  }


  handleSortName(){
    let staffList = this.state.staffs
    if (this.state.abc) {
      staffList.sort(function(a, b) {
        var textA = a.last_name.toUpperCase()
        var textB = b.last_name.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        staffList.sort(function(a, b) {
          var textA = a.last_name.toUpperCase()
          var textB = b.last_name.toUpperCase()
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {abc: this.state.abc ? false : true, staffs: staffList})
    this.setState(newState)
  }

  handleSortRole(){
    let staffList = this.state.staffs
    if (this.state.role) {
      staffList.sort(function(a, b) {
        var textA = a.role.title.toUpperCase()
        var textB = b.role.title.toUpperCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })} else {
        staffList.sort(function(a, b) {
          var textA = a.role.title.toUpperCase()
          var textB = b.role.title.toUpperCase()
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {role: this.state.role ? false : true, staffs: staffList})
    this.setState(newState)
  }

  handleSortAgency(){
    let staffList = this.state.staffs
    if (this.state.agency) {
      staffList.sort(function(a, b) {
        var textA = a.agency
        var textB = b.agency
        return (textA === null) ? 1 : (textB === null) ? -1 : (textA.name.toUpperCase() > textB.name.toUpperCase() ) ? -1 : (textA.name.toUpperCase() < textB.name.toUpperCase()) ? 1 : 0
      })} else {
        staffList.sort(function(a, b) {
          var textA = a.agency
          var textB = b.agency
          return (textA === null) ? 1 : (textB === null) ? -1 : (textA.name.toUpperCase() > textB.name.toUpperCase() ) ? 1 : (textA.name.toUpperCase() < textB.name.toUpperCase()) ? -1 : 0
        })
      }
    var newState = Object.assign({}, this.state, {agency: this.state.agency ? false : true, staffs: staffList})
    this.setState(newState)
  }


  render(){
    const filteredList = this.state.staffs.filter( s => s.fullname.toLowerCase().includes(this.state.search.toLowerCase()) || s.role.title.toLowerCase().includes(this.state.search.toLowerCase()) || (s.agency ? s.agency.name.toLowerCase().includes(this.state.search.toLowerCase()) : false) || (s.office_phone ? s.office_phone.includes(this.state.search) : false) )
    return(
      !this.state.staffs[0] ? <h1>Loading</h1> :
          <div>
            <Search search={this.state.search} handleChange={this.handleChange.bind(this)} />
            <StaffTable
              sortedAndFilteredList={filteredList}
              handleSortName={this.handleSortName.bind(this)}
              handleSortRole={this.handleSortRole.bind(this)}
              handleSortAgency={this.handleSortAgency.bind(this)}
              handleSelectStaff={this.handleSelectStaff.bind(this)}
              handleSelectAgency={this.handleSelectAgency.bind(this)}
            />
          </div>

    )
  }

}
