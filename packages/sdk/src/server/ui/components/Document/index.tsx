import React, { ReactNode } from 'react'

interface DocumentProps {
  children: ReactNode
}

export function Document({ children }: DocumentProps) {
  return (
    <html>
      <body>
        <div id='app'>{children}</div>
      </body>
    </html>
  )
}
