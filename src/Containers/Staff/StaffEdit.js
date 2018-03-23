import React, { Component } from 'react'

import StaffForm from './StaffForm.js'
import { fetchFormInfo, editResource } from '../../api'

export default class ServicesEdit extends Component{
  constructor(props){
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      office_phone: '',
      cell_phone: '',
      agency: '',
      role: '',
      dc_services: [],
      so_services: [],
      sdl_services: [],
      // provider_services: [],
      id: '',
      agencyNames: [],
      roles: [],
      staff: [],
      services_list: [],
      agencies: [],
      arms: [],
      assignments: ''
    }
  }

  componentDidMount(){
    fetchFormInfo('staff')
    .then(
      data => {
        let agencyNames = data.agencies.map( a => a.name)
        let roles = data.role.map( r => r.title)
        return this.setState({
          agencyNames: agencyNames,
          roles: roles,
          staff: data.staff,
          services_list: data.service,
          agencies: data.agencies,
          arms: data.arms,
          first_name: this.props.history.location.state.first_name,
          last_name: this.props.history.location.state.last_name,
          email: this.props.history.location.state.email,
          office_phone: this.props.history.location.state.office_phone ? this.props.history.location.state.office_phone : '',
          cell_phone: this.props.history.location.state.cell_phone ? this.props.history.location.state.cell_phone : '',
          agency: this.props.history.location.state.agency.name,
          role: this.props.history.location.state.role.title,
          dc_services: this.props.history.location.state.dc_services.map(s => s.title),
          so_services: this.props.history.location.state.so_services.map(s => s.title),
          sdl_services: this.props.history.location.state.sdl_services.map(s => s.title),
          // provider_services: this.props.history.location.state.provider_services.map(s => s.title),
          // provider_services: [],
          id: this.props.history.location.state.id,
          assignments: this.props.history.location.state.assignments.map( a => a.name )
        })
      }
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })

  }

  handleInputChange(event, data){
    let value = (data.type === 'checkbox') ? data.checked : data.value
    if (data.id === "role" ) {
      this.setState({
        assignments: [],
        services: [],
        [data.id]: value
      })
    } else {
      this.setState({
        [data.id]: value,
      })
    }
  }

  handleSubmit(event){
    event.preventDefault()
    let info = {id: this.state.id, first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, office_phone: this.state.office_phone, cell_phone: this.state.cell_phone, agency: this.state.agency, role: this.state.role, services: this.state.services, assignments:this.state.assignments}
    if (!this.state.staff.some( s => s.first_name === this.state.first_name && s.last_name === this.state.last_name && s.id !== this.state.id)) {
      if (!this.state.staff.some(s => s.email === this.state.email && s.id !== this.state.id)) {
        if (!this.state.staff.some(s => s.office_phone === this.state.office_phone && s.id !== this.state.id)) {
          if (!this.state.staff.some(s => s.cell_phone === this.state.cell_phone && s.id !== this.state.id)) {
            if (!((this.state.role === "CIO" || this.state.role === "Commissioner") && this.state.staff.some( s => s.agency_id === this.state.agencyNames.indexOf(this.state.agency) + 1 && s.id !== this.state.id && s.role_id === this.state.roles.indexOf(this.state.role) + 1))) {
              if (this.state.agency === "INFORMATION TECHNOLOGY AND TELECOMMUNICATIONS, DEPARTMENT OF") {
                if (this.state.role === 'SDL' && (this.state.services_list.filter( s => this.state.sdl_services.includes( s.title)).some( s => s.sdl_id !== undefined && s.id !== this.state.id))) {
                  message = `Services can only have one SDL. `
                  this.state.services_list.filter( s => this.state.sdl_services.includes( s.title )).forEach( s => {
                    if (typeof(s.id) === "number") {
                      message += `${this.state.staff.find( st => st.id === s.sdl_id).first_name} ${this.state.staff.find( st => st.id === s.sdl_id).last_name} is the SDL for ${s.title}. `
                    }
                  })
                  alert(message)
                } else if (this.state.role === 'Service Owner' && (this.state.services_list.filter( s => this.state.so_services.includes( s.title)).some( s => s.service_owner_id !== undefined && s.id !== this.state.id))) {
                  message = `Services can only have one Service Owner. `
                  this.state.services_list.filter( s => this.state.so_services.includes( s.title )).forEach( s => {
                    if (typeof(s.id) === "number") {
                      message += `${this.state.staff.find( st => st.id === s.service_owner_id).first_name} ${this.state.staff.find( st => st.id === s.service_owner_id).last_name} is the Service Owner for ${s.title}. `
                    }
                  })
                  alert(message)
                } else if (this.state.role === 'ARM' ) {
                  if (this.state.agencies.filter( agency => this.state.assignments.some( assignment => agency.name === assignment)).filter( assigned => this.state.arms.some( arm => assigned.id === arm.agency_id)).length < 1) {
                      editResource(info, 'staff', 'staff')
                      .then( staff => this.props.history.goBack())
                  } else {
                    var message = `Agencies can only have one ARM. `
                    this.state.agencies.filter( agency => this.state.assignments.some( assignment => agency.name === assignment)).filter( assigned => this.state.arms.some( arm => assigned.id === arm.agency_id)).forEach( a => {
                      message += `${a.name} already has an ARM. Remove or reassign the ARM from ${a.name}. `
                    })
                    alert(message)
                  }
                } else {
                  editResource(info, 'staff', 'staff')
                  .then( staff => this.props.history.goBack())
                }
              } else {
                editResource(info, 'staff', 'staff')
                .then( staff => this.props.history.goBack())
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
        <h1>Edit a Staff Member</h1>
        <StaffForm
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          email={this.state.email}
          office_phone={this.state.office_phone}
          cell_phone={this.state.cell_phone}
          agency={this.state.agency}
          agencies={this.state.agencies}
          arms={this.state.arms}
          role={this.state.role}
          dc_services={this.state.dc_services}
          so_services={this.state.so_services}
          sdl_services={this.state.sdl_services}
          // provider_services={this.state.provider_services}
          agencyNames={this.state.agencyNames}
          roles={this.state.roles}
          staff={this.state.staff}
          assignments={this.state.assignments}
          services_list={this.state.services_list}
          id={this.state.id}
          path={this.props.match.path}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
