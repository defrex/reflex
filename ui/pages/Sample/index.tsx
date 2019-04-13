import React, { ComponentClass, PureComponent } from 'react'
import { match } from 'react-router-dom'

interface SampleParams {
  component: string
  sample: string
}

interface SampleProps {
  match: match<SampleParams>
}

interface SampleState {
  Example?: ComponentClass
}

export default class Sample extends PureComponent<SampleProps, SampleState> {
  state: SampleState = {}

  componentDidMount() {
    const { match } = this.props
    import(`ui/components/${match.params.component}/samples`).then(
      (samples: { [key: string]: ComponentClass }) => {
        console.log(samples)
        this.setState({ Example: samples[match.params.sample] })
      },
    )
  }

  render() {
    const { Example } = this.state
    return <>{Example ? <Example /> : null}</>
  }
}
