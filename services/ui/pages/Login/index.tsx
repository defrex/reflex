import React from 'react'
import GithubAuthButton from 'ui/components/GithubAuthButton'
import { LoginQueryComponent } from 'ui/lib/graphql'
import styles from './styles'

export default function Login() {
  return (
    <div className={styles.notFound}>
      <LoginQueryComponent>
        {({ data }) =>
          data ? <GithubAuthButton query={data}>Login</GithubAuthButton> : null
        }
      </LoginQueryComponent>
    </div>
  )
}
