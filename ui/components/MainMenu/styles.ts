import { stylesheet } from 'typestyle'

// import { primary } from 'ui/lib/colors'

export default stylesheet({
  mainMenu: {
    position: 'absolute',
    top: 64,
    left: 0,
    height: 'calc(100vh - 64px)',
    width: 256,

    backgroundColor: 'white',
    borderRight: '1px solid gray',
  },
  list: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
  item: {
    padding: '8px 16px',
  },
  username: {
    display: 'block',
    fontSize: 18,
  },
  lowEmphisis: {
    color: 'gray',
  },
})
