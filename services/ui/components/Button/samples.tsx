import { samplesOf } from '@reflexui/sdk'
import React from 'react'
import Button from '.'

samplesOf('Button')
  .add('Default', () => {
    return <Button>Default Button</Button>
  })
  .add('Primary', () => {
    return <Button style='primary'>Primary Button</Button>
  })
