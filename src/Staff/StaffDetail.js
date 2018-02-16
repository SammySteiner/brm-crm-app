import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../api'
import { Redirect } from 'react-router-dom'

export default class StaffDetail extends Component {
  constructor(props){
    super()
    this.state = {
      staff: {}
    }
  }

  componentDidMount(){
    getDetails('staff', this.props.match.params.id)
    .catch(error => {
    })
    .then(staff => { if (staff.error) {
      console.log(staff.error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    } else {
      return this.setState({staff: staff})
    }
  })
  }

  assignments(){
    if (this.state.staff.role.title === "ARM") {
      return <li>Assignments: <ol>{this.state.staff.assignments.map(a => <li key={a.id}>{a.name}</li>)}</ol></li>
    } else {
      return ""
    }
  }

  services(){
    if (this.state.staff.role.title === "SDL" || this.state.staff.role.title === "Service Provider" || this.state.staff.role.title === "Service Owner") {
      return <li>Services: <ol>{this.state.staff.services.map(s => <li key={s.id}>{s.title}</li>)}</ol></li>
    } else {
      return ""
    }

  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.staff.id + "/edit",
      state: this.state.staff
    })
  }

  handleDelete(event){
    deleteResource('staff', this.state.staff.id)
    .then( staff => alert(`${staff.fullname}, the ${staff.role.title} of ${staff.agency.name} has successfully been deleted from the databse`))
    .then( () => this.props.history.goBack())
  }

  render(){
    return(
      !this.state.staff.id ? <h1>Loading</h1> :
      <div>
        <ul className='staff-detail'>
          <li>Name: {this.state.staff.fullname}</li>
          <li>Agency: {this.state.staff.agency.name}</li>
          <li>Email: {this.state.staff.email}</li>
          <li>Office: {this.state.staff.office_phone}</li>
          <li>Cell: {this.state.staff.cell_phone}</li>
          <li>Role: {this.state.staff.role.title}</li>
          {this.assignments()}
          {this.services()}
        </ul>
        <button onClick={this.handleDelete.bind(this)}>Delete</button>
        <button onClick={this.handleEdit.bind(this)}>Edit</button>
      </div>

    )
  }
}
