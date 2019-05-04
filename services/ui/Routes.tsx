import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import Component from 'ui/pages/Component'
import CreateTeam from 'ui/pages/CreateTeam'
import Dashboard from 'ui/pages/Dashboard'
import Index from 'ui/pages/Index'
import Library from 'ui/pages/Library'
import Login from 'ui/pages/Login'
import NotFound from 'ui/pages/NotFound'
import Sample from 'ui/pages/Sample'
import Team from 'ui/pages/Team'
import {
  componentRoute,
  createTeamRoute,
  dashboardRoute,
  libraryRoute,
  loginRoute,
  sampleRoute,
  teamRoute,
} from './lib/routes'

export default class Router extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path={dashboardRoute()} component={Dashboard} />
        <Route path={componentRoute()} component={Component} />
        <Route path={sampleRoute()} component={Sample} />
        <Route path={libraryRoute()} component={Library} />
        <Route path={teamRoute()} component={Team} />
        <Route path={createTeamRoute()} component={CreateTeam} />
        <Route path={loginRoute()} component={Login} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
