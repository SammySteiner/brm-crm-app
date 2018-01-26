import React, { Component } from 'react'

export default class Agencies extends Component {
  constructor(){
    super()
    this.state = {
      agencies: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/agencies')
      .then(response => response.json())
      .then(agencies => this.setState({ agencies }))
  }

  render(){
    return(
      <div className="agency-list">
        {this.state.agencies.map(agency => {
          return (
            <div className="agency">
              <h3>{agency.name}</h3>
              <h3>{agency.acronym}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}
