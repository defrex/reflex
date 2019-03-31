import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'

import { TeamPageQueryComponent } from 'ui/lib/graphql'

interface TeamPageProps {
  teamId: string
}

export default class TeamPage extends PureComponent<TeamPageProps> {
  static getInitialProps({ query }: { query: { id: string } }): TeamPageProps {
    return { teamId: query.id }
  }

  render() {
    const { teamId } = this.props
    return (
      <TeamPageQueryComponent variables={{ teamId }}>
        {({ data }) =>
          data ? (
            <Page query={data}>
              <h1>{data.team!.name}</h1>
            </Page>
          ) : null
        }
      </TeamPageQueryComponent>
    )
  }
}
