import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import routes from 'ui/routes'

import { ChecksPageQuery } from './queries.graphql'
import Page from 'ui/components/Page'

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
          <Page query={data}>
            <h1>ChecksPage</h1>
            {data && data.githubChecks ? (
              <ul>
                {data.githubChecks.map((githubCheck) => (
                  <li key={githubCheck.id}>
                    <routes.Link
                      route='check'
                      params={{
                        repoName: githubCheck.repoName,
                        repoOwner: githubCheck.repoOwner,
                        commitSha: githubCheck.commitSha,
                      }}
                    >
                      <a>
                        {`${githubCheck.repoOwner}/${githubCheck.repoName}@${
                          githubCheck.commitSha
                        }`}
                      </a>
                    </routes.Link>
                  </li>
                ))}
              </ul>
            ) : (
              'No Data Available'
            )}
          </Page>
        )}
      </Query>
    )
  }
}
