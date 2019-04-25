import { stylesheet } from 'typestyle'

import { primary } from 'ui/lib/colors'

export default stylesheet({
  appBarOuter: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primary,
  },
  appBarInner: {
    width: '100%',
    maxWidth: 1024,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'spaceBetween',

    $nest: {
      '@media (maxWidth: 1024px)': {
        marginLeft: 16,
        marginRight: 16,
      },
    },
  },
  logo: {
    height: 32,
    margin: 16,
  },
  spacer: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
})
