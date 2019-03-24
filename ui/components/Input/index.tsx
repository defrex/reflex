import React, { PureComponent, ChangeEvent } from 'react'
import { startCase } from 'lodash'

import styles from './styles'

interface InputProps {
  name: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  label?: string
  optional?: boolean
}

export default class Input extends PureComponent<InputProps> {
  static defaultProps = {
    optional: false,
  }

  render() {
    const { name, value, onChange, label, optional } = this.props
    return (
      <label css={styles.label}>
        <div css={styles.labelText}>
          {label ? label : startCase(name)}
          {optional ? (
            <span css={styles.labelOptional}>{' (optional)'}</span>
          ) : null}
        </div>
        <input
          css={styles.input}
          type='text'
          name={name}
          onChange={onChange}
          value={value}
        />
      </label>
    )
  }
}
