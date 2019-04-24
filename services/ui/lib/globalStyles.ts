import { cssRule, cssRaw } from 'typestyle'

cssRule('*', {
  boxSizing: 'border-box',
})

cssRule('html, body', {
  margin: 0,
  padding: 0,

  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  lineHeight: 1,
})

cssRaw(`
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,500);
`)
