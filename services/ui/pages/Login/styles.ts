import { stylesheet } from 'typestyle'

import { primary, light } from 'ui/lib/colors'

export default stylesheet({
  notFound: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: primary,
    color: light,
  },
})
