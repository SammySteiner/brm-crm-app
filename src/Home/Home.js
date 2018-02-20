import React, { Component } from 'react'

import ArmHome from './ArmHome.js'
import GeneralHome from './GeneralHome.js'
import StaffDetail from '../Staff/StaffDetail.js'

import { getDirectory, getDetails } from '../api'

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      staff: {}
    }
  }

  componentDidMount(){
    getDetails('staff', localStorage.id)
    .then( staff => this.setState({
      staff: staff
    }))
  }
// This component should pull whatever data is necessary for arms or general users and switch to the apprropriate route.
  render(){
    return (
      <div>
        {/* <StaffDetail /> */}
      </div>
    )
  }
}
