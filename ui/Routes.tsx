import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateTeam from 'ui/pages/CreateTeam'
import Dashboard from 'ui/pages/Dashboard'
import Index from 'ui/pages/Index'
import Library from 'ui/pages/Library'
import NotFound from 'ui/pages/NotFound'
import Sample from 'ui/pages/Sample'
import Team from 'ui/pages/Team'
import {
  createTeamRoute,
  dashboardRoute,
  libraryRoute,
  sampleRoute,
  teamRoute,
} from './lib/routes'

export default class Router extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path={dashboardRoute()} component={Dashboard} />
        <Route path={sampleRoute()} component={Sample} />
        <Route path={libraryRoute()} component={Library} />
        <Route path={teamRoute()} component={Team} />
        <Route path={createTeamRoute()} component={CreateTeam} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
