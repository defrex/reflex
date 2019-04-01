import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import Index from 'ui/pages/Index'
import Dashboard from 'ui/pages/Dashboard'
import Library from 'ui/pages/Library'
import Team from 'ui/pages/Team'
import CreateTeam from 'ui/pages/CreateTeam'

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
