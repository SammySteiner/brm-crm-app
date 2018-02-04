import React, { Component } from 'react'

import StaffForm from './StaffForm.js'
import { fetchFormInfo, createResource } from '../api'

export default class StaffNew extends Component{
  constructor(){
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      office_phone: '',
      cell_phone: '',
      agency: '',
      role: '',
      service: '',
      agencyNames: [],
      roles: [],
      staff: [],
      services: []
    }
  }

  componentDidMount(){
    fetchFormInfo('staff')
    .then(
      data => {
        let agencyNames = data.agency.map( a => a.name)
        let roles = data.role.map( r => r.title)
        let services = data.service.map( s => s.title)
        return this.setState({ agencyNames: agencyNames, roles: roles, staff: data.staff, services: services })
      }
    )
  }

  handleInputChange(event){
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [event.target.id]: value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    // for roles:
    // 1. sdl/service owner - must get sdl/servoice owner info from db in initial request, must not allow if the service alsready has an sdl, say who the sdl is.
    // 2. commissioner/cio - must get info from db in initial request, must not allow if agency already has commissioner/cio
    // 3. service proivider should show services.
    // 4. agency === doitt should show sdl, arm, arm manager, service owner, and service provider.
    // 5. add general staff to roles.
    // let info = {name: this.state.name, acronym: this.state.acronym, category: this.state.category, mayoral: this.state.mayoral, citynet: this.state.citynet, address: this.state.address}
    // createResource(info, 'agency', 'agencies')
    let info = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, office_phone: this.state.office_phone, cell_phone: this.state.cell_phone, agency: this.state.agency, role: this.state.role, service: this.state.service}
    createResource(info, 'staff', 'staff')
    .then( staff => this.props.history.push(staff.id.toString()))
  }


  render(){
    return(
      <div>
        <h1>Add a Staff Member</h1>
        <StaffForm
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          email={this.state.email}
          office_phone={this.state.office_phone}
          cell_phone={this.state.cell_phone}
          agency={this.state.agency}
          role={this.state.role}
          service={this.state.service}
          agencyNames={this.state.agencyNames}
          roles={this.state.roles}
          staff={this.state.staff}
          services={this.state.services}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
