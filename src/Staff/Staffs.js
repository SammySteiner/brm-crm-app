import React, { Component } from 'react'

import { getStaffs } from '../api'

export default class Staffs extends Component {
  constructor(){
    super()
    this.state = {
      staffs: []
    }
  }

  componentDidMount(){
    getStaffs()
    .then( staffs => this.setState({ staffs }))
  }

  render(){
    return(
      <div className ="staff-list">
        {this.state.staffs.map(staff => {
          return (
            <div className="agency">
              <h3>{staff.first_name} {staff.last_name}</h3>
              <h3>{staff.agency}</h3>
            </div>
          )
        })}

      </div>
    )
  }

}
