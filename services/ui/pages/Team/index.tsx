import React, { PureComponent } from 'react'
import { match } from 'react-router-dom'
import Page from 'ui/components/Page'
import { TeamPageQueryComponent } from 'ui/lib/graphql'

interface RouteParams {
  teamId: string
}

interface TeamPageProps {
  teamId: string
  match: match<RouteParams>
}

export default class TeamPage extends PureComponent<TeamPageProps> {
  render() {
    const { match } = this.props
    return (
      <TeamPageQueryComponent variables={{ teamId: match.params.teamId }}>
        {({ data }) =>
          data && data.team ? (
            <Page query={data}>
              <h1>{data.team.name}</h1>
            </Page>
          ) : null
        }
      </TeamPageQueryComponent>
    )
  }
}
