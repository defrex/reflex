export default {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
      },
    ],
    '@babel/typescript',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    'react-loadable/babel',
    'emotion',
  ],
}
