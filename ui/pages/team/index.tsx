import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'

import { TeamPageQueryComponent } from 'ui/lib/graphql'
import styles from './styles'

interface TeamPageProps {
  teamId: number
}

export default class TeamPage extends PureComponent<
  TeamPageProps
> {
  static getInitialProps({
    query,
  }: {
    query: { id: string }
  }): TeamPageProps {
    return { teamId: parseInt(query.id) }
  }

  render() {
    const { teamId } = this.props
    return (
      <TeamPageQueryComponent variables={{ teamId }}>
        {({ data }) =>
          data ? (
            <Page css={styles.root} query={data}>
              <h1>{data.team!.name}</h1>
            </Page>
          ) : null
        }
      </TeamPageQueryComponent>
    )
  }
}
