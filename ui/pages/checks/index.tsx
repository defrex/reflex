import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ChecksPageQuery = gql`
  query ChecksPageQuery {
    githubChecks {
      id
    }
  }
`

export default class ChecksPage extends PureComponent {
  render () {
    return (
      <Query query={ChecksPageQuery}>
        {({ loading, error, data }) => (
          <div>
            <h1>ChecksPage</h1>
            <ul className="li"><strong>loading:</strong>{loading}</ul>
            <ul className="li"><strong>error:</strong>{error}</ul>
            <ul className="li">
              <strong>data:</strong>
              {data.githubChecks.map((githubCheck: any) => (
                <div key={githubCheck.id}>{githubCheck.id}</div>
              ))}
            </ul>
          </div>
        )}
      </Query>
    )
  }
}
