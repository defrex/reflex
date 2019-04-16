import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

function packageJson() {
  return {
    name: 'package-json',
    generateBundle(options, bundle, isWrite) {
      bundle['package.json'] = JSON.stringify({
        name: pkg.name,
        version: pkg.version,
        dependencies: pkg.dependencies,
      })
    },
  }
}

export default {
  input: 'src/index.ts',
  output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
  external: [
    ...Object.keys(pkg.dependencies),
    'util',
    'fs',
    'events',
    'assert',
    'path',
    'stream',
    'child_process',
    'buffer',
    'os',
    'tty',
    'worker_threads',
    'constants',
    'crypto',
    'http',
    'https',
    'url',
    'zlib',
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
    packageJson(),
  ],
}
