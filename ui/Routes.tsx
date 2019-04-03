import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import Index from 'ui/pages/Index'
import Dashboard from 'ui/pages/Dashboard'
import Library from 'ui/pages/Library'
import Team from 'ui/pages/Team'
import CreateTeam from 'ui/pages/CreateTeam'
import Example from 'ui/pages/Example'

export default class Router extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/dashboard' component={Dashboard} />
        <Route
          path='/teams/:teamId/examples/:component/:example'
          component={Example}
        />
        <Route path='/teams/:teamId/library' component={Library} />
        <Route path='/teams/:teamId' component={Team} />
        <Route path='/teams' component={CreateTeam} />
      </Switch>
    )
  }
}
