import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'

import { OrganizationsPageQueryComponent } from 'ui/lib/graphql'
import styles from './styles'

export default class OrganizationsPage extends PureComponent {
  render() {
    return (
      <OrganizationsPageQueryComponent>
        {({ data }) =>
          data ? (
            <Page css={styles.root} query={data}>
              <h1>Create Organization</h1>
              <ul>
                {data.organizations.map((organization) => (
                  <li key={organization.id}>{organization.name}</li>
                ))}
              </ul>
            </Page>
          ) : null
        }
      </OrganizationsPageQueryComponent>
    )
  }
}
