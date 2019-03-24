import React, { ChangeEvent, FormEvent } from 'react'

import Input from 'ui/components/Input'
import Button from 'ui/components/Button'

interface CreateOrganizationFormFields {
  name: string
}

interface CreateOrganizationFormProps {
  onSubmit: (values: CreateOrganizationFormFields) => void | Promise<any>
}

interface CreateOrganizationFormState {
  isSubmitting: boolean
  values: CreateOrganizationFormFields
}

export default class CreateOrganizationForm extends React.PureComponent<
  CreateOrganizationFormProps,
  CreateOrganizationFormState
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
          Create Organization
        </Button>
      </form>
    )
  }
}
