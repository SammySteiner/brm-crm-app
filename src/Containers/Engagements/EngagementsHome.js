import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Engagements from './Engagements.js'
import EngagementsDetail from './EngagementsDetail.js'
import EngagementsNew from './EngagementsNew.js'
import EngagementsEdit from './EngagementsEdit.js'

export default (props) => {
  return(
    <Switch>
      <Route exact path='/engagements' render={({ history }) => <Engagements history={history}/>}/>
      <Route exact path='/engagements/new' render={({ match, history }) => <EngagementsNew history={history} match={match}/>}/>\
      <Route exact path='/engagements/:id/edit' render={({ match, history }) => <EngagementsEdit history={history} match={match}/>}/>\
      <Route exact path='/engagements/:id' render={({ match, history }) => <EngagementsDetail history={history} match={match}/>}/>
    </Switch>
  )
}
