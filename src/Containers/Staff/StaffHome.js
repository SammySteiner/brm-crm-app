import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Staffs from './Staffs.js'
import StaffDetail from './StaffDetail.js'
import StaffNew from './StaffNew.js'
import StaffEdit from './StaffEdit.js'

export default (props) => {
  return(
    <Switch>
      <Route exact path='/staff' render={({ history }) => <Staffs history={history}/>}/>
      <Route exact path='/staff/new' render={({ match, history }) => <StaffNew history={history} match={match}/>}/>\
      <Route exact path='/staff/:id/edit' render={({ match, history }) => <StaffEdit history={history} match={match}/>}/>\
      <Route exact path='/staff/:id' render={({ match, history }) => <StaffDetail history={history} match={match}/>}/>
    </Switch>
  )
}
