import { stylesheet } from 'typestyle'
import { primary } from 'ui/lib/colors'

export default stylesheet({
  root: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: primary,
  },
  img: {
    display: 'block',
    height: '100px',
    margin: '0 32px',
  },
  buttonWrapper: {
    marginTop: 32,
  },
})
