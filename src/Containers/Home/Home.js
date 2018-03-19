import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

// import ArmHome from './ArmHome.js'
// import GeneralHome from './GeneralHome.js'
// import StaffDetail from '../Staff/StaffDetail.js'
import StaffHome from '../Staff/StaffHome.js'
import AgenciesHome from '../Agencies/AgenciesHome.js'
import ServicesHome from '../Services/ServicesHome.js'
import ConnectionsHome from '../Connections/ConnectionsHome.js'
import EngagementsHome from '../Engagements/EngagementsHome.js'

import { getDetails } from '../../api'

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

  render(){
    return (
      <Container>
        <Switch>
          <Route path='/staff' render={({match, history}) => <StaffHome history={history} match={match}/>}/>
          <Route path='/agencies' render={({match, history}) => <AgenciesHome history={history} match={match}/>}/>
          <Route path='/services' render={({match, history}) => <ServicesHome history={history} match={match}/>}/>
          <Route path='/connections' render={({match, history}) => <ConnectionsHome history={history} match={match}/>}/>
          <Route path='/engagements' render={({match, history}) => <EngagementsHome history={history} match={match}/>}/>
        </Switch>
      </Container>
    )
  }
}
