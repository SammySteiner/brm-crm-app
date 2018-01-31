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
    .then( () => this.props.history.push('/agencies'))
  }


  available(field){
    return field === null ? 'Data Not Available' : field
  }

  render(){
    return(
      !this.state.agency.id ? <h1>Loading</h1> :
      <div>
        <ul className='agency-detail'>
          <li>Name: {this.state.agency.name}</li>
          <li>Acronym: {this.state.agency.acronym}</li>
          <li>Mayoral: {this.available(this.state.agency.mayoral)}</li>
          <li>Access to CityNet? {this.available(this.state.agency.citynet)}</li>
          <li>Address: {this.available(this.state.agency.address)}</li>
          <li>Commissioner: {this.state.agency.commissioner ? this.state.agency.commissioner.first_name + " " + this.state.agency.commissioner.last_name : 'Data Not Available'}</li>
          <li>CIO: {this.state.agency.cio ? this.state.agency.cio.first_name + " " + this.state.agency.cio.last_name : 'Data Not Available'}</li>
          <li>ARM: {this.state.agency.arm ? this.state.agency.arm.first_name + " " + this.state.agency.arm.last_name : 'Data Not Available'}</li>
        </ul>
        <button onClick={this.handleDelete.bind(this)}>Delete</button>
      </div>

    )
  }
}
