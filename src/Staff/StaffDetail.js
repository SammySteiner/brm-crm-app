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
    .then(staff => this.setState({staff: staff}))
  }

  assignments(){
    if (this.state.staff.role.title === "ARM") {
      return <li>Assignments: <ol>{this.state.staff.assignments.map(a => <li key={a.id}>{a.name}</li>)}</ol></li>
    } else {
      return ""
    }
  }

  handleDelete(event){
    deleteResource('staff', this.state.staff.id)
    .then( () => this.props.history.push('/staff'))
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
        </ul>
        <button onClick={this.handleDelete.bind(this)}>Delete</button>
      </div>

    )
  }
}
