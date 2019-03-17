import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import routes from 'ui/routes'

import Page from 'ui/components/Page'
import { ChecksPageQuery } from './query.graphql'

interface ChecksPageProps {
  repoOwner: string
  repoName: string
}

export default class ChecksPage extends PureComponent<ChecksPageProps> {
  static getInitialProps({ query }: { query: ChecksPageProps }) {
    return query
  }

  render() {
    const { repoName, repoOwner } = this.props
    return (
      <Query query={ChecksPageQuery} variables={{ repoName, repoOwner }}>
        {({ data }) => (
          <Page>
            <h1>Checks</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Page>
        )}
      </Query>
    )
  }
}
