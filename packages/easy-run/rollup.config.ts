import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
  external: [...Object.keys(pkg.dependencies), 'child_process'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
  ],
}
