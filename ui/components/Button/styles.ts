import { stylesheet } from 'typestyle'
import tinycolor from 'tinycolor2'

import { primary, dark, light, gray } from 'ui/lib/colors'

export default stylesheet({
  button: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '8px 16px',
    height: '32px',

    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',

    lineHeight: '16px',
    textDecoration: 'none',

    $nest: {
      '& > img': {
        maxHeight: '16px',
        marginRight: '4px',
      },
    },
  },
  light: {
    borderColor: gray,
    backgroundColor: light,
    color: dark,

    $nest: {
      '&:hover': {
        backgroundColor: tinycolor(light)
          .darken(5)
          .toString(),
      },

      '&:active': {
        backgroundColor: tinycolor(light)
          .darken(10)
          .toString(),
      },
    },
  },
  primary: {
    borderColor: gray,
    backgroundColor: primary,
    color: light,

    $nest: {
      '&:hover': {
        backgroundColor: tinycolor(primary)
          .lighten(5)
          .toString(),
      },

      '&:active': {
        backgroundColor: tinycolor(primary)
          .lighten(10)
          .toString(),
      },
    },
  },
})
