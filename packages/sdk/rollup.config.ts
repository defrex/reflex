import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

const config = {
  watch: {
    include: 'src/**',
    clearScreen: false,
  },
}

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.module, format: 'cjs', sourcemap: true },
      { file: pkg.main, format: 'cjs', sourcemap: true, banner: '#!/usr/bin/env node' },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
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
      'net',
      'url',
      'zlib',
    ],
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),
      // Resolve source maps to the original source
      sourceMaps(),
    ],
    ...config,
  },
]
