import React, { PureComponent, ComponentClass } from 'react'
import { match } from 'react-router-dom'

interface ExamplesParams {
  component: string
  example: string
}

interface ExamplesProps {
  match: match<ExamplesParams>
}

interface ExamplesState {
  Example?: ComponentClass
}

export default class Examples extends PureComponent<
  ExamplesProps,
  ExamplesState
> {
  state: ExamplesState = {}

  componentDidMount() {
    const { match } = this.props
    import(`ui/components/${match.params.component}/examples`).then(
      (examples: { [key: string]: ComponentClass }) => {
        console.log(examples)
        this.setState({ Example: examples[match.params.example] })
      },
    )
  }

  render() {
    const { Example } = this.state
    return <>{Example ? <Example /> : null}</>
  }
}
