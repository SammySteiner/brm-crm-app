import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Connections from './Connections.js'
// import ConnectionsDetail from './ConnectionsDetail.js'
// import ConnectionsNew from './ConnectionsNew.js'
// import ConnectionsEdit from './ConnectionsEdit.js'

export default (props) => {
  return(
    <Switch>
      <Route exact path='/connections' render={({ history }) => <Connections history={history}/>}/>
      {/* <Route exact path='/connections/new' render={({ match, history }) => <ConnectionsNew history={history} match={match}/>}/>\
      <Route exact path='/connections/:id/edit' render={({ match, history }) => <ConnectionsEdit history={history} match={match}/>}/>\
      <Route exact path='/connections/:id' render={({ match, history }) => <ConnectionsDetail history={history} match={match}/>}/> */}
    </Switch>
  )
}
