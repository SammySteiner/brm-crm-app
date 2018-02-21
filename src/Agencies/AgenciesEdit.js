import React, { Component } from 'react'

import AgenciesForm from './AgenciesForm.js'
import { fetchFormInfo, editResource } from '../api'

export default class AgenciesEdit extends Component{
  constructor(props){
    super()
    this.state = {
      name: "",
      acronym: "",
      category: "",
      mayoral: "",
      citynet: "",
      address: "",
      id: "",
      agencies: []
    }
  }

  componentDidMount(){
    fetchFormInfo('agencies')
    .then(
      data => { return this.setState({
        agencies: data,
        name: this.props.history.location.state.name,
        acronym: this.props.history.location.state.acronym,
        category: this.props.history.location.state.category.toString(),
        mayoral: this.props.history.location.state.mayoral,
        citynet: (this.props.history.location.state.address === null) ? false : this.props.history.location.state.citynet,
        address: (this.props.history.location.state.address === null) ? '' : this.props.history.location.state.address,
        id: this.props.history.location.state.id,
       })}
    )
    .catch(error => {
      console.log(error)
      alert('You must be logged in to access this page.')
      return this.props.history.push('/login')
    })
  }

  handleInputChange(event){
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({
      [event.target.id]: value
    })
  }

  handleRadioChange = (e, { value }) => this.setState({ category: value })

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
          handleRadioChange={this.handleRadioChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}
