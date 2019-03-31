import { stylesheet } from 'typestyle'

export default stylesheet({
  root: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    listStyle: 'none',

    $nest: {
      '& > li::after': {
        content: '>',
        margin: '0 8px',
      },
      '& > li:lastChild::after': {
        content: '',
      },
    },
  },
})
