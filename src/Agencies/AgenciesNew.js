import React, { Component } from 'react'

import AgenciesForm from './AgenciesForm.js'
import { fetchFormInfo, createResource } from '../api'

export default class AgencyNew extends Component{
  constructor(){
    super()
    this.state = {
      name: '',
      acronym: '',
      category: '1',
      mayoral: false,
      citynet: false,
      address: '',
      agencies: []
    }
  }

  componentDidMount(){
    fetchFormInfo('agencies')
    .then(
      data => {
        return this.setState({ agencies: data.agencies })
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
    let info = {name: this.state.name, acronym: this.state.acronym, category: this.state.category, mayoral: this.state.mayoral, citynet: this.state.citynet, address: this.state.address}
    createResource(info, 'agency', 'agencies')
    .then( agency => this.props.history.push(agency.id.toString()))
  }


  render(){
    return(
      <div>
        <h1>Add an Agency</h1>
        <AgenciesForm
          name={this.state.name}
          acronym={this.state.acronym}
          category={this.state.category}
          mayoral={this.state.mayoral}
          citynet={this.state.citynet}
          address={this.state.address}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
