import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import Index from 'ui/pages/index'
import Dashboard from 'ui/pages/dashboard'
import Library from 'ui/pages/library'
import Team from 'ui/pages/team'
import CreateTeam from 'ui/pages/createTeam'

export default class Router extends PureComponent {
  render() {
    return (
      <>
        <Route path='/' exact component={Index} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/teams/:id/library' component={Library} />
        <Route path='/teams/:id' component={Team} />
        <Route path='/teams' component={CreateTeam} />
      </>
    )
  }
}
