export interface DashboardRouteParams {}
export function dashboardRoute(_values?: DashboardRouteParams) {
  return '/dashboard'
}

export interface SampleRouteParams {
  teamId: string
  component: string
  sample: string
}
export function sampleRoute(values?: SampleRouteParams) {
  const params = {
    teamId: ':teamId',
    component: ':component',
    sample: ':sample',
    ...values,
  }
  return `/teams/${params.teamId}/samples/${params.component}/${params.sample}`
}

export interface LibraryRouteParams {
  teamId: string
}
export function libraryRoute(values?: LibraryRouteParams) {
  const params = {
    teamId: ':teamId',
    ...values,
  }
  return `/teams/${params.teamId}/library`
}

export interface TeamRouteParams {
  teamId: string
}
export function teamRoute(values?: TeamRouteParams) {
  const params = {
    teamId: ':teamId',
    ...values,
  }
  return `/teams/${params.teamId}`
}

export interface CreateTeamRouteParams {}
export function createTeamRoute(_values?: CreateTeamRouteParams) {
  return '/teams'
}

export interface ComponentRouteParams {
  teamId: string
  componentId: string
}
export function componentRoute(values?: ComponentRouteParams) {
  const params = {
    teamId: ':teamId',
    componentId: ':componentId',
    ...values,
  }
  return `/teams/${params.teamId}/component/${params.componentId}`
}
