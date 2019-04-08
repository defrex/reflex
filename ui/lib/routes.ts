export interface DashboardRouteParams {}
export function dashboardRoute(_values?: DashboardRouteParams) {
  return '/dashboard'
}

export interface ExampleRouteParams {
  teamId: string
  component: string
  example: string
}
export function exampleRoute(values?: ExampleRouteParams) {
  const params = {
    teamId: ':teamId',
    component: ':component',
    example: ':example',
    ...values,
  }
  return `/teams/${params.teamId}/examples/${params.component}/${
    params.example
  }`
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
