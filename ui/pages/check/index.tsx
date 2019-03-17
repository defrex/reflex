import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'

import Page from 'ui/components/Page'
import Code from 'ui/components/Code'

import { CheckPageQuery } from './queries.graphql'
import styles from './styles'

interface ChecksPageProps {
  repoName: string
  repoOwner: string
  commitSha: string
}

export default class ChecksPage extends PureComponent<ChecksPageProps> {
  static getInitialProps({ query }: { query: ChecksPageProps }) {
    return query
  }

  render() {
    const { repoName, repoOwner, commitSha } = this.props
    return (
      <Query
        query={CheckPageQuery}
        variables={{ repoName, repoOwner, commitSha }}
      >
        {({ data }) => (
          <Page css={styles.root} query={data}>
            <h1>ChecksPage</h1>
            <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
          </Page>
        )}
      </Query>
    )
  }
}
