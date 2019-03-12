import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'

import { ChecksPageQuery } from './queries.graphql'

interface ChecksPageProps {
  repoName: string
  repoOwner: string
  commitSha: string
}

export default class ChecksPage extends PureComponent<ChecksPageProps> {
  static getInitialProps ({ query }: { query: ChecksPageProps }) {
    return query
  }

  render () {
    const { repoName, repoOwner, commitSha } = this.props
    return (
      <Query
        query={ChecksPageQuery}
        variables={{ repoName, repoOwner, commitSha }}
      >
        {({ loading, error, data }) => (
          <div>
            <h1>ChecksPage</h1>
            <ul>
              <li><strong>loading:</strong>{loading}</li>
              <li><strong>error:</strong>{error}</li>
              <li>
                <strong>data:</strong>
                {console.log(data)}
                {data && data.githubCheck ? (
                  <ul>
                    <li><strong>id:</strong>{data.githubCheck.id}</li>
                    <li><strong>repoOwner:</strong>{data.githubCheck.repoOwner}</li>
                    <li><strong>repoName:</strong>{data.githubCheck.repoName}</li>
                    <li><strong>commitSha:</strong>{data.githubCheck.commitSha}</li>
                    <li><strong>githubCheckId:</strong>{data.githubCheck.githubCheckId}</li>
                  </ul>
                ) : 'No Data Available'}
              </li>
            </ul>
          </div>
        )}
      </Query>
    )
  }
}
