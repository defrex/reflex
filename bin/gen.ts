#!/bin/env ts-node
import { generate } from 'graphql-code-generator'

// import { run } from './utils'
import config from '../config'

export default async function gen (options = {}) {
  return generate({
    schema: config.graphqlSchemaPath,
    overwrite: true,
    generates: {
      'gen/schema.d.ts': {
        plugins: ['typescript-common', 'typescript-server'],
      },
      'gen/documents.d.ts': {
        documents: config.graphqlDocumentPaths,
        plugins: ['typescript-common', 'typescript-client'],
      },
    },
    ...options,
  })
}

if (require.main === module) {
  gen()
}
