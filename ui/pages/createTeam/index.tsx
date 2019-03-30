import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import CreateTeamForm from 'ui/components/CreateTeamForm'

import {
  TeamsPageQueryComponent,
  CreateTeamPageMutationComponent,
  CreateTeamPageMutationMutation,
  CreateTeamPageMutationMutationVariables,
} from 'ui/lib/graphql'
import styles from './styles'
import { MutationFn } from 'react-apollo'

export default class TeamsPage extends PureComponent {
  handleSubmit = (
    mutate: MutationFn<
      CreateTeamPageMutationMutation,
      CreateTeamPageMutationMutationVariables
    >,
  ) => async (values: CreateTeamPageMutationMutationVariables) => {
    const response = await mutate({ variables: values })
    if (
      response &&
      response.data &&
      response.data.createTeam &&
      response.data.createTeam.status.success
    ) {
      // routes.pushRoute('team', {
      //   id: response.data.createTeam.team!.id,
      // })
      console.warn('🦙 HANDLE THIS')
    } else {
      console.error('💢', response)
    }
  }
  render() {
    return (
      <TeamsPageQueryComponent>
        {({ data }) =>
          data ? (
            <Page css={styles.root} query={data}>
              <h1>Create Team</h1>
              <CreateTeamPageMutationComponent>
                {(createTeam) => (
                  <CreateTeamForm onSubmit={this.handleSubmit(createTeam)} />
                )}
              </CreateTeamPageMutationComponent>
            </Page>
          ) : null
        }
      </TeamsPageQueryComponent>
    )
  }
}
