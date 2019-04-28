import React, { ReactNode, useState } from 'react'
import { Redirect } from 'react-router'
import AppBar from 'ui/components/AppBar'
import Code from 'ui/components/Code'
import { PageQueryFragment } from 'ui/lib/graphql'
import MainMenu from '../MainMenu'
import styles from './styles'

interface PageProps {
  query: PageQueryFragment
  debug?: boolean
  document?: any
  noAuth?: boolean
  children: ReactNode
}

export default function Page({
  children,
  query,
  document,
  debug = false,
  noAuth = false,
}: PageProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  if (!query.currentUser && !noAuth) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <AppBar query={query} onMenuclick={() => setMenuOpen(!menuOpen)} />
      <MainMenu visible={menuOpen} query={query} />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {children}
          {debug && document && document.loc ? (
            <Code language='graphql'>{document.loc.source.body}</Code>
          ) : null}
          {debug ? (
            <Code language='json'>{JSON.stringify(query, null, 2)}</Code>
          ) : null}
        </div>
      </div>
    </div>
  )
}
