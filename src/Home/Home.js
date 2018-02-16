import React, { Component } from 'react'

import ArmHome from './ArmHome.js'
import GeneralHome from './GeneralHome.js'

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      staff: []
    }
  }

  render(){
    return (
      <div>
        Hi
        <ArmHome/>
        <GeneralHome/>
      </div>
    )
  }
}
