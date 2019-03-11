import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ChecksPageQuery = gql`
  query ChecksPageQuery (
    $repoOwner: String!,
    $repoName: String!,
    $commitSha: String!,
  ) {
    githubCheck(
      repoOwner: $repoOwner,
      repoName: $repoName,
      commitSha: $commitSha,
    ) {
      id
      repoOwner
      repoName
      commitSha
      githubCheckId
    }
  }
`

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
                {data ? (
                  <ul>
                    <li><strong>id:</strong>{data.id}</li>
                    <li><strong>repoOwner:</strong>{data.repoOwner}</li>
                    <li><strong>repoName:</strong>{data.repoName}</li>
                    <li><strong>commitSha:</strong>{data.commitSha}</li>
                    <li><strong>githubCheckId:</strong>{data.githubCheckId}</li>
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
