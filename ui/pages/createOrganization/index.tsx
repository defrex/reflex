import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import CreateOrganizationForm from 'ui/components/CreateOrganizationForm'

import {
  OrganizationsPageQueryComponent,
  CreateOrganizationPageMutationComponent,
} from 'ui/lib/graphql'
import styles from './styles'

export default class OrganizationsPage extends PureComponent {
  render() {
    return (
      <OrganizationsPageQueryComponent>
        {({ data }) =>
          data ? (
            <Page css={styles.root} query={data}>
              <h1>Create Organization</h1>
              <CreateOrganizationPageMutationComponent>
                {(createOrganization) => (
                  <CreateOrganizationForm
                    onSubmit={(variables) => createOrganization({ variables })}
                  />
                )}
              </CreateOrganizationPageMutationComponent>
            </Page>
          ) : null
        }
      </OrganizationsPageQueryComponent>
    )
  }
}
