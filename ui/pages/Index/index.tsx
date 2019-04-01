import React, { PureComponent } from 'react'

import Button from 'ui/components/Button'

import styles from './styles'

export default class IndexPage extends PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <img className={styles.img} src='/static/protologo.svg' alt='Reflex' />
        <div className={styles.buttonWrapper}>
          <Button.A
            href='https://airtable.com/shrT4LTkYvxqJRMSo'
            style='primary'
          >
            Learn More
          </Button.A>
        </div>
      </div>
    )
  }
}
