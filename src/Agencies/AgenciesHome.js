import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Agencies from './Agencies.js'
import AgenciesDetail from './AgenciesDetail.js'
import AgenciesNew from './AgenciesNew.js'
import AgenciesEdit from './AgenciesEdit.js'

export default (props) => {
  return(
    <Switch>
      <Route exact path='/agencies' render={({ history }) => <Agencies history={history}/>}/>
      <Route exact path='/agencies/new' render={({ match, history }) => <AgenciesNew history={history} match={match}/>}/>\
      <Route exact path='/agencies/:id/edit' render={({ match, history }) => <AgenciesEdit history={history} match={match}/>}/>\
      <Route exact path='/agencies/:id' render={({ match, history }) => <AgenciesDetail history={history} match={match}/>}/>
    </Switch>
  )
}
