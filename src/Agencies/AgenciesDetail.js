import React,{ Component } from 'react'
import { getDetails, deleteResource } from '../api'

export default class AgencyDetail extends Component {
  constructor(props){
    super()
    this.state = {
      agency: {}
    }
  }

  componentDidMount(){
    getDetails('agencies', this.props.match.params.id)
    .then(agency => this.setState({agency: agency}))
  }

  handleDelete(event){
    deleteResource('agencies', this.state.agency.id)
    .then( staff => {
      if (staff[0] !== undefined) {
        var alertIntro = `${staff[0].agency.name} has successfully been deleted from the database. The staff of the agency have not been deleted, including: `
        var alertStaff = []
        for (var i = 0; i < staff.length; i++) {
          alertStaff.push(staff[i].fullname)
        }
        var alertMessage = alertIntro + alertStaff.join(', ') + '.'
        alert(alertMessage)
      } else {
        alert(`${this.state.agency.name} has successfully been deleted from the database. This agency had no staff in the Database.`)
      }
    })
    .then( () => this.props.history.goBack())
  }


  available(field){
    return field === null ? 'Data Not Available' : field
  }

  handleEdit(event){
    event.preventDefault()
    this.props.history.push({
      pathname: this.state.agency.id + "/edit",
      state: this.state.agency
    })
  }


  render(){
    console.log(this.state.agency);
    return(
      !this.state.agency.id ? <h1>Loading</h1> :
      <div>
        <ul className='agency-detail'>
          <li>Name: {this.state.agency.name}</li>
          <li>Acronym: {this.state.agency.acronym}</li>
          <li>Mayoral: {this.state.agency.mayoral ? "Yes" : "No"}</li>
          <li>Access to CityNet? {this.state.agency.citynet ? "Yes" : "No"}</li>
          <li>Address: {this.available(this.state.agency.address)}</li>
          <li>Category: {this.available(this.state.agency.category)}</li>
          <li>Commissioner: {this.state.agency.commissioner ? this.state.agency.commissioner.first_name + " " + this.state.agency.commissioner.last_name : 'Data Not Available'}</li>
          <li>CIO: {this.state.agency.cio ? this.state.agency.cio.first_name + " " + this.state.agency.cio.last_name : 'Data Not Available'}</li>
          <li>ARM: {this.state.agency.arm ? this.state.agency.arm.first_name + " " + this.state.agency.arm.last_name : 'Data Not Available'}</li>
        </ul>
        <button onClick={this.handleDelete.bind(this)}>Delete</button>
        <button onClick={this.handleEdit.bind(this)}>Edit</button>
      </div>

    )
  }
}
