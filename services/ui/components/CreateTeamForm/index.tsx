import React, { ChangeEvent, FormEvent } from 'react'

import Input from 'ui/components/Input'
import Button from 'ui/components/Button'

interface CreateTeamFormFields {
  name: string
}

interface CreateTeamFormProps {
  onSubmit: (values: CreateTeamFormFields) => void | Promise<any>
}

interface CreateTeamFormState {
  isSubmitting: boolean
  values: CreateTeamFormFields
}

export default class CreateTeamForm extends React.PureComponent<
  CreateTeamFormProps,
  CreateTeamFormState
> {
  state = {
    values: {
      name: '',
    },
    isSubmitting: false,
  }

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const { values } = this.state
    const { onSubmit } = this.props

    event.preventDefault()

    this.setState({ isSubmitting: true })
    await onSubmit(values)
    this.setState({ isSubmitting: false })
  }

  handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { values } = this.state
    this.setState({
      values: {
        ...values,
        name: event.target.value,
      },
    })
  }

  render() {
    const { isSubmitting, values } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name='name'
          onChange={this.handleNameChange}
          value={values.name}
          optional
        />

        <Button type='submit' disabled={isSubmitting} style='primary'>
          Create Team
        </Button>
      </form>
    )
  }
}
