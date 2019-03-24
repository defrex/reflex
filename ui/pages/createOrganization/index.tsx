import React, { PureComponent } from 'react'

import routes from 'ui/routes'
import Page from 'ui/components/Page'
import CreateOrganizationForm from 'ui/components/CreateOrganizationForm'

import {
  OrganizationsPageQueryComponent,
  CreateOrganizationPageMutationComponent,
  CreateOrganizationPageMutationMutation,
  CreateOrganizationPageMutationMutationVariables,
} from 'ui/lib/graphql'
import styles from './styles'
import { MutationFn } from 'react-apollo'

export default class OrganizationsPage extends PureComponent {
  handleSubmit = (
    mutate: MutationFn<
      CreateOrganizationPageMutationMutation,
      CreateOrganizationPageMutationMutationVariables
    >,
  ) => async (values: CreateOrganizationPageMutationMutationVariables) => {
    const response = await mutate({ variables: values })
    if (
      response &&
      response.data &&
      response.data.createOrganization &&
      response.data.createOrganization.status.success
    ) {
      routes.pushRoute('organization', {
        id: response.data.createOrganization.organization!.id,
      })
    } else {
      console.error('💢', response)
    }
  }
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
                    onSubmit={this.handleSubmit(createOrganization)}
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
