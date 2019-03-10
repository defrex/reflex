import { generate } from 'graphql-code-generator'

import config from 'api/config'

export default async function gen (options = {}) {
  return generate({
    schema: config.graphqlSchemaPath,
    overwrite: true,
    generates: {
      [config.absolutePath('gen/schema.d.ts')]: {
        plugins: ['typescript-common', 'typescript-server'],
      },
      [config.absolutePath('gen/documents.d.ts')]: {
        documents: config.graphqlDocumentPaths,
        plugins: ['typescript-common', 'typescript-client'],
      },
    },
    ...options,
  })
}
