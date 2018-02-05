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
        console.log(data.staff[0]);
        console.log(data.service[0]);
        return this.setState({ agencyNames: agencyNames, roles: roles, staff: data.staff, services: data.service })
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
    let info = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, office_phone: this.state.office_phone, cell_phone: this.state.cell_phone, agency: this.state.agency, role: this.state.role, service: this.state.service}
    if (!this.state.staff.some( s => s.first_name === this.state.first_name && s.last_name === this.state.last_name)) {
      if (!this.state.staff.some(s => s.email === this.state.email)) {
        if (!this.state.staff.some(s => s.office_phone === this.state.office_phone)) {
          if (!this.state.staff.some(s => s.cell_phone === this.state.cell_phone)) {
            if (!((this.state.role === "CIO" || this.state.role === "Commissioner") && this.state.staff.some( s => s.agency_id === this.state.agencyNames.indexOf(this.state.agency) + 1 && s.role_id === this.state.roles.indexOf(this.state.role) + 1))) {
              if (this.state.agency === "INFORMATION TECHNOLOGY AND TELECOMMUNICATIONS, DEPARTMENT OF") {
                if (!(this.state.role === 'SDL' && this.state.services.filter( s => s.title === this.state.service)[0].sdl_id !== undefined)) {
                  createResource(info, 'staff', 'staff')
                  .then( staff => this.props.history.push(staff.id.toString()))
                } else {
                  alert(`${this.state.staff.filter(s => s.id === this.state.services.filter( s => s.title === this.state.service)[0].sdl_id - 1)[0]['first_name']} ${this.state.staff.filter(s => s.id === this.state.services.filter( s => s.title === this.state.service)[0].sdl_id - 1)[0]['last_name']} is the current SDL of ${this.state.service}. Remove or reassign the SDL of ${this.state.service} before adding someone to that posittion.`)
                }
              } else {
                createResource(info, 'staff', 'staff')
                .then( staff => this.props.history.push(staff.id.toString()))
              }
            } else {
              alert(`${this.state.staff.filter( s => s.agency_id === this.state.agencyNames.indexOf(this.state.agency) + 1 && s.role_id === this.state.roles.indexOf(this.state.role) + 1)[0]['first_name']} ${this.state.staff.filter( s => s.agency_id === this.state.agencyNames.indexOf(this.state.agency) + 1 && s.role_id === this.state.roles.indexOf(this.state.role) + 1)[0]['last_name']} is the current ${this.state.role} of ${this.state.agency}. Remove or reassign the ${this.state.role} of ${this.state.agency} before adding someone to that posittion.`)
            }
          } else {
            alert(`Each employee needs a unique cell phone number. ${this.state.cell_phone} is  already in use.`)
          }
        } else {
          alert(`Each employee needs a unique office phone number. ${this.state.office_phone} is  already in use.`)
        }
      } else {
        alert(`Each employee needs a unique email address. ${this.state.email} is  already in use.`)
      }
    } else {
      alert(`Each employee needs a unique full name. ${this.state.first_name} ${this.state.last_name} is  already in the system. Having mutliple people with the same name can get confusing.`)
    }
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
