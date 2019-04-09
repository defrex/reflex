import { samplesOf } from '@reflexui/sampler'
import React from 'react'
import Button from './index'

samplesOf('Button')
  .add('Default', () => {
    return <Button>Default Button</Button>
  })
  .add('Primary', () => {
    return <Button style='primary'>Primary Button</Button>
  })
