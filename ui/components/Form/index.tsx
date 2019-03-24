import React, { ReactNode } from 'react'

// TODO
// This Form is a WIP. The design goal here will be to make it
// seamless to handle MutationResponses easily

interface FormProps<FormFields> {
  onSubmit: (values: FormFields) => void | Promise<any>
  initialValues: FormFields
  children: ReactNode
}

interface FormState<FormFields> {
  isSubmitting: boolean
  values: FormFields
}

export default class Form<FormFields> extends React.PureComponent<
  FormProps<FormFields>,
  FormState<FormFields>
> {
  static Context = React.createContext({})

  constructor(props: FormProps<FormFields>) {
    super(props)

    this.state = {
      values: { ...props.initialValues },
      isSubmitting: false,
    }
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { values } = this.state
    const { onSubmit } = this.props

    event.preventDefault()

    this.setState({ isSubmitting: true })
    await onSubmit(values)
    this.setState({ isSubmitting: false })
  }

  // handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { values } = this.state
  //   this.setState({
  //     values: {
  //       ...values,
  //       field: event.target.value,
  //     },
  //   })
  // }

  render() {
    const { children } = this.props
    const { isSubmitting, values } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Context.Provider value={{ values, isSubmitting }}>
          {children}
          {/*
        <label htmlFor='comment-field'>Comment</label>
        <textarea
          name='comment'
          id='comment-field'
          onChange={this.handleChange}
          value={values.comment}
          />

        <button type='submit' disabled={isSubmitting}>
          Confirm Order
        </button> */}
        </Form.Context.Provider>
      </form>
    )
  }
}
