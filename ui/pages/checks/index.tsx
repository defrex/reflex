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
      <Query query={ChecksPageQuery} variables={{ repoName, repoOwner }}>
        {({ loading, error, data }) => (
          <div>
            <h1>ChecksPage</h1>
            <ul>
              <li>
                <strong>loading:</strong>
                {loading}
              </li>
              <li>
                <strong>error:</strong>
                {error}
              </li>
              <li>
                <strong>data:</strong>
                {data && data.githubChecks ? (
                  <ul>
                    {data.githubChecks.map((githubCheck) => (
                      <li key={githubCheck.id}>
                        <routes.Link
                          route="check"
                          params={{
                            repoName: githubCheck.repoName,
                            repoOwner: githubCheck.repoOwner,
                            commitSha: githubCheck.commitSha,
                          }}
                        >
                          <a>
                            {`${githubCheck.repoOwner}/${
                              githubCheck.repoName
                            }@${githubCheck.commitSha}`}
                          </a>
                        </routes.Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No Data Available'
                )}
              </li>
            </ul>
          </div>
        )}
      </Query>
    )
  }
}
