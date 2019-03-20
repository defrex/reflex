import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import Code from 'ui/components/Code'

import { CheckPageQueryComponent } from 'ui/graphqlClient'
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
      <CheckPageQueryComponent variables={{ repoName, repoOwner, commitSha }}>
        {({ data }) => (
          <Page css={styles.root} query={data}>
            <h1>ChecksPage</h1>
            <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
          </Page>
        )}
      </CheckPageQueryComponent>
    )
  }
}
