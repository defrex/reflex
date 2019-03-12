import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import routes from 'ui/routes'

import { ChecksPageQuery } from './queries.graphql'

interface ChecksPageProps {
  repoOwner: string
  repoName: string
}

export default class ChecksPage extends PureComponent<ChecksPageProps> {
  static getInitialProps ({ query }: { query: ChecksPageProps }) {
    return query
  }

  render () {
    const { repoName, repoOwner } = this.props
    return (
      <Query
        query={ChecksPageQuery}
        variables={{ repoName, repoOwner }}
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
                {data && data.githubChecks ? (
                  <ul>
                    {data.githubChecks.map((githubCheck) => (
                      <li key={githubCheck.id}>
                        <routes.Link route='check' params={{
                          repoName: githubCheck.repoName,
                          repoOwner: githubCheck.repoOwner,
                          commitSha: githubCheck.commitSha,
                        }}>
                          {githubCheck.commitSha}
                        </routes.Link>
                      </li>
                    ))}
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
