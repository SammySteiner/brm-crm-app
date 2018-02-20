import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Services from './Services.js'
import ServicesDetail from './ServicesDetail.js'
import ServicesNew from './ServicesNew.js'
import ServicesEdit from './ServicesEdit.js'

export default (props) => {
  return(
    <Switch>
      <Route exact path='/services' render={({ history }) => <Services history={history}/>}/>
      <Route exact path='/services/new' render={({ match, history }) => <ServicesNew history={history} match={match}/>}/>\
      <Route exact path='/services/:id/edit' render={({ match, history }) => <ServicesEdit history={history} match={match}/>}/>\
      <Route exact path='/services/:id' render={({ match, history }) => <ServicesDetail history={history} match={match}/>}/>
    </Switch>
  )
}
