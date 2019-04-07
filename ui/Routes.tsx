import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateTeam from 'ui/pages/CreateTeam'
import Dashboard from 'ui/pages/Dashboard'
import Example from 'ui/pages/Example'
import Index from 'ui/pages/Index'
import Library from 'ui/pages/Library'
import NotFound from 'ui/pages/NotFound'
import Team from 'ui/pages/Team'

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
        <Route component={NotFound} />
      </Switch>
    )
  }
}
