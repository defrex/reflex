import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import Code from 'ui/components/Code'

import { ChecksPageQuery } from 'ui/gen'

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
      <ChecksPageQuery.Component variables={{ repoName, repoOwner }}>
        {({ data }) =>
          data ? (
            <Page query={data}>
              <h1>Checks</h1>
              <Code language='graphql'>{ChecksPageQuery.Document}</Code>
              <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
            </Page>
          ) : null
        }
      </ChecksPageQuery.Component>
    )
  }
}
