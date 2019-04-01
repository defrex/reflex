import { stylesheet } from 'typestyle'

export default stylesheet({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    maxWidth: 1024,
    marginTop: 32,
    marginBottom: 32,

    $nest: {
      '@media (max-width: 1024px)': {
        marginLeft: 16,
        marginRight: 16,
        width: 'calc(100vw - 64px)',
        overflow: 'hidden',
      },
    },
  },
})
