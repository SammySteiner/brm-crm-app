import React, { Component } from 'react'

import AgenciesForm from './AgenciesForm.js'
import { fetchFormInfo, editResource } from '../api'

export default class AgenciesEdit extends Component{
  constructor(props){
    super()
    this.state = {
      name: props.history.location.state.name,
      acronym: props.history.location.state.acronym,
      category: props.history.location.state.category.toString(),
      mayoral: props.history.location.state.mayoral,
      citynet: (props.history.location.state.address === null) ? false : props.history.location.state.citynet,
      address: (props.history.location.state.address === null) ? '' : props.history.location.state.address,
      id: props.history.location.state.id,
      agencies: [],
    }
  }

  componentDidMount(){
    fetchFormInfo('agencies')
    .then(
      data => { return this.setState({ agencies: data })}
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
    let info = {id: this.state.id, name: this.state.name, acronym: this.state.acronym, category: this.state.category, mayoral: this.state.mayoral, citynet: this.state.citynet, address: this.state.address}
    if (this.state.id !== undefined && !this.state.agencies.filter( (a, i ) => a.name.toLowerCase() === this.state.name.toLowerCase()).some( a => a.id !== this.state.id)) {
      if (!this.state.agencies.filter( a => a.acronym ? a.acronym.toLowerCase() === this.state.acronym.toLowerCase() : false ).some( a => a.id !== this.state.id)) {
        editResource(info, 'agency', 'agencies/')
        .then( agency => this.props.history.goBack())
      } else {
        alert(`The agency acronym must be unique. ${this.state.acronym} is already the acronym of an agency.`)
      }
    } else {
      alert(`The agency name must be unique. ${this.state.name} is already the name of an agency.`)
    }
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <h1>Edit an Agency</h1>
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
