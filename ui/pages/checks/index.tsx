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
  render() {
    const { repoName, repoOwner } = this.props
    console.log('🍊 ChecksPage#render', ChecksPageQuery)
    return (
      <Query query={ChecksPageQuery} variables={{ repoName, repoOwner }}>
        {({ data }) => (
          <Page query={data}>
            {console.log('🍊 ChecksPage#render+data', data)}
            <h1>Checks</h1>
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
