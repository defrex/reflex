import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import Code from 'ui/components/Code'

import {
  ChecksPageQueryComponent,
  ChecksPageQueryDocument,
} from 'ui/graphqlClient'

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
      <ChecksPageQueryComponent variables={{ repoName, repoOwner }}>
        {({ data }) =>
          data ? (
            <Page query={data}>
              <h1>Checks</h1>
              <Code language='graphql'>
                {ChecksPageQueryDocument.loc.source.body}
              </Code>
              <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
            </Page>
          ) : null
        }
      </ChecksPageQueryComponent>
    )
  }
}
